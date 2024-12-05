import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { getPollById, getAllVoteByPollid, getInforAuthor, getPollResultsBlockChain } from '../../../api/CallApi';
import { Poll, Vote, ListReultsResponse } from '../../../typeObject';
import './StatisticsDialog.css';

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface StatisticsDialogProps {
  open: boolean;
  handleClose: () => void;
  pollId: string;
}

const StatisticsDialog: React.FC<StatisticsDialogProps> = ({ open, handleClose, pollId }) => {
  const [poll, setPoll] = useState<Poll | null>(null);
  const [votes, setVotes] = useState<Vote[]>([]);
  const [showVotes, setShowVotes] = useState(false);  // State để kiểm soát hiển thị chi tiết vote
  const [usernames, setUsernames] = useState<Map<string, string>>(new Map()); // State để lưu username theo userId
  const [results, setResults] = useState<ListReultsResponse | null>(null);

  useEffect(() => {
    if (!pollId || !open) return; // Kiểm tra nếu không có pollId hoặc dialog không mở thì không làm gì

    const fetchVote = async () => {
      try {
        // Chỉ gọi API nếu poll chưa được tải
        if (!poll) {
          const pollResponse = await getPollById(pollId);
          setPoll(pollResponse.data);

          // Nếu là loại "privatesmc", gọi API blockchain để lấy kết quả
          if (pollResponse.data.typeContent === "privatesmc" && pollResponse.data.pollIdSm) {
            const resultsResponse = await getPollResultsBlockChain(pollResponse.data.pollIdSm);
            setResults(resultsResponse);
          }
        }

        // Lấy dữ liệu votes
        const voteResponse = await getAllVoteByPollid(pollId);
        setVotes(voteResponse.data);

        // Xây dựng map userId -> username
        const usernameMap = new Map<string, string>();
        for (const vote of voteResponse.data) {
          if (vote.userId && !usernameMap.has(vote.userId)) {
            const userResponse = await getInforAuthor(vote.userId);
            if (userResponse.data?.fullName) {
              usernameMap.set(vote.userId, userResponse.data.fullName);
            }
          }
        }
        setUsernames(usernameMap);
      } catch (error) {
        console.error("Error fetching vote data:", error);
      }
    };

    fetchVote();
  }); // useEffect chỉ kích hoạt khi pollId hoặc open thay đổi
  // Cập nhật lại khi pollId hoặc open thay đổi và poll chưa được tải

  // Tính tổng số phiếu bầu từ results hoặc từ votes nếu results rỗng
  const totalVotes = results && results.results.length > 0
    ? results.results.reduce((sum, result) => sum + result.voteCount, 0)
    : votes.length; // Nếu results là rỗng, sử dụng số phiếu trong votes

  // Tìm người chiến thắng
  const winner = poll?.options?.reduce((max, option) =>
    option.votes.length > (max.votes.length) ? option : max, poll?.options?.[0] || { votes: [] });

  // Lọc ra các tùy chọn có số phiếu giống nhau và là cao nhất
  const topOptions = poll?.options?.filter(option => option.votes.length === winner?.votes.length);

  // Xác định chiến thắng hoặc hòa nhau
  const winnerContent = topOptions?.length === 1
    ? topOptions[0].contentOption
    : 'Hòa nhau';

  // Chuẩn bị dữ liệu cho biểu đồ
  const data = {
    labels: poll?.options?.map(option => option.contentOption) || [],
    datasets: [
      {
        label: 'Số lượng phiếu bầu',
        data: results && results.results.length > 0
          ? poll?.options?.map((option, index) => {
            const result = results?.results[index];
            return result ? result.voteCount : 0;
          }) || []
          : poll?.options?.map(option => option.votes.length) || [], // Nếu không có results thì dùng option.votes.length
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Biểu đồ thống kê kết quả bình chọn',
      },
    },
  };

  const formatDateTime = (isoString: string): string => {
    const date = new Date(isoString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  return (
<Dialog
  PaperProps={{
    className: "statisticsDialog",
  }}
  fullWidth={true}
  maxWidth="lg"
  open={open}
  onClose={handleClose}
>

      <DialogTitle>Thống kê kết quả bình chọn</DialogTitle>
      <DialogContent>
        {poll ? (
          <div  >
            <div style={{ display: "flex" }}>
              <div>
                <p><strong>Tên cuộc bình chọn:</strong> {poll.title}</p>
                <p><strong>Mô tả:</strong> {poll.description}</p>
                <p><strong>Thời gian tạo:</strong> {formatDateTime(poll.timeCreate)}</p>
                <p><strong>Thời gian bắt đầu:</strong> {poll.timeStart ? formatDateTime(poll.timeStart) : "N/A"}</p>
                <p><strong>Thời gian kết thúc:</strong> {formatDateTime(poll.timeEnd)}</p>
              </div>
            </div>
            <Button onClick={() => setShowVotes(!showVotes)} variant="contained">
              {showVotes ? "Ẩn chi tiết" : "Xem chi tiết"}
            </Button>
            {showVotes && (
              <div>
                {votes.length > 0 ? votes.map((vote, index) => {
                  const selectedOption = poll?.options?.find(option => option._id === vote.optionId);
                  const username = vote.userId ? usernames.get(vote.userId) : null; // Lấy username từ Map
                  return (
                    <div key={index} className='chitiet' style={{ margin: "10px 0", borderBottom: "1px solid black" }}>
                      <div style={{ display: "flex" }}>
                        <p><strong>Lượt thứ:</strong> {index + 1}</p>
                        <p><strong>Người bình chọn:</strong> {username || "N/A"}</p> {/* Hiển thị username */}
                      </div>
                      <div style={{ display: "flex" }}>
                        <p><strong>Thời gian bình chọn:</strong> {formatDateTime(vote.timestamp)}</p>
                        {(poll.typeContent !== "privatesmc") && <p><strong>Lựa chọn:</strong> {selectedOption ? selectedOption.contentOption : "null"}</p>
            }
                        
                      </div>
                    </div>
                  );
                }) : <p>Chưa có phiếu bầu nào.</p>}
              </div>
            )}

            <Bar data={data} options={options} />

            <div>
              <p><strong>Tổng số lượt tham gia bình chọn: </strong> {totalVotes}</p>
              <p><strong>Chiến thắng thuộc về: </strong> {winnerContent}</p>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Đóng
        </Button>
      </DialogActions>
    </Dialog>

  );
};

export default StatisticsDialog;
