import { Link } from "react-router-dom";
import { ListPoll } from "../../ContentListPoll/ListPoll/ListPoll";
import './ContentPollLayout.css';
import { AuthContext } from '../../../../contextapi/AuthContext';
import { useContext, useEffect, useState } from "react";
import { getAllVoteUser } from '../../../../api/CallApi';
import { Poll } from '../../../../typeObject';
import Swal from 'sweetalert2';  // Import SweetAlert2

export const ContentPollLayout = () => {
    const authContext = useContext(AuthContext); // Lấy thông tin người dùng
    const { user, walletAddress } = authContext!; // Lấy thêm walletAddress từ AuthContext

    // Khai báo state với kiểu dữ liệu cụ thể
    const [voting, setVoting] = useState<Poll[]>([]);
    const [voted, setVoted] = useState<Poll[]>([]); 
    const [voteSM, setVoteSM] = useState<Poll[]>([]); 
    const [canCreatePoll, setCanCreatePoll] = useState<boolean>(true); // Kiểm tra xem có thể tạo bình chọn hay không
    const [errorMessage, setErrorMessage] = useState<string>(''); // State để lưu thông báo lỗi

    useEffect(() => {
        const fetchVotes = async () => {
            if (!user) {
                console.log('User not logged in');
            } else {
                try {
                    const response = await getAllVoteUser(user._id.toString());

                    // Lấy trực tiếp mảng `Vote[]` từ `response.data`
                    const votes: Poll[] = Array.isArray(response.data) ? response.data : [];

                    console.log('Votes:', votes); // Log ra tất cả các cuộc bình chọn để kiểm tra dữ liệu

                    // Lọc các cuộc bình chọn chưa kết thúc và đã kết thúc
                    const currentVoting = votes.filter(vote => {
                        const parsedTimeEnd = new Date(vote.timeEnd);
                        console.log('TimeEnd:', vote.timeEnd, 'Parsed TimeEnd:', parsedTimeEnd); // Log giá trị `timeEnd`
                        return vote.typeContent && vote.typeContent !== "privatesmc" && 
                            !isNaN(parsedTimeEnd.getTime()) && parsedTimeEnd.getTime() > new Date().getTime();
                    });

                    const votedVotes = votes.filter(vote => {
                        const parsedTimeEnd = new Date(vote.timeEnd);
                        console.log('TimeEnd:', vote.timeEnd, 'Parsed TimeEnd:', parsedTimeEnd); // Log giá trị `timeEnd`
                        return vote.typeContent && vote.typeContent !== "privatesmc" &&
                            !isNaN(parsedTimeEnd.getTime()) && parsedTimeEnd.getTime() <= new Date().getTime();
                    });

                    const votedVoteSm = votes.filter(vote => {
                        return vote.typeContent && vote.typeContent === "privatesmc";
                    });

                    console.log('Filtered Voting:', currentVoting); // Log mảng `currentVoting` sau khi lọc
                    console.log('Filtered Voted:', votedVotes); // Log mảng `votedVotes` sau khi lọc
                    console.log('Filtered VoteSM:', votedVoteSm); // Log mảng `votedVoteSm` sau khi lọc

                    setVoting(currentVoting);
                    setVoted(votedVotes);
                    setVoteSM(votedVoteSm);

                    // Kiểm tra số lượng cuộc bình chọn trong tháng này, chỉ kiểm tra nếu không có walletAddress
                    if (!walletAddress) {
                        const currentMonthVotes = votes.filter(vote => {
                            const voteDate = new Date(vote.timeCreate);
                            const currentMonth = new Date();
                            return voteDate.getMonth() === currentMonth.getMonth() && voteDate.getFullYear() === currentMonth.getFullYear();
                        });

                        // Nếu người dùng đã tạo 2 cuộc bình chọn trong tháng này, không cho phép tạo thêm
                        if (currentMonthVotes.length >= 2) {
                            setCanCreatePoll(false);
                            setErrorMessage('Bạn đã tạo 2 cuộc bình chọn trong tháng này. Hãy kết nối ví metamask để có thể tạo vô hạn.');
                        } else {
                            setCanCreatePoll(true);
                            setErrorMessage('');
                        }
                    } else {
                        // Nếu đã kết nối ví Metamask, không giới hạn số cuộc bình chọn
                        setCanCreatePoll(true);
                        setErrorMessage('');
                    }

                } catch (error) {
                    console.error('Failed to fetch votes:', error);
                }
            }
        };

        fetchVotes();
    }, [user, walletAddress]); // Thêm walletAddress vào dependency để theo dõi sự thay đổi

    // Hàm xử lý khi người dùng click vào nút "Tạo bình chọn"
    const handleCreatePollClick = (event: React.MouseEvent) => {
        if (!canCreatePoll) {
            event.preventDefault(); // Ngừng hành động mặc định nếu không thể tạo bình chọn
            
            // Hiển thị thông báo lỗi bằng SweetAlert2
            Swal.fire({
                icon: 'error',
                title: 'Không thể tạo bình chọn',
                text: errorMessage,
                confirmButtonText: 'Đồng ý'
            });
        }
    };

    return (
        <div className="wrapper_votelayout">
            <div className="content_vote">
                {/* Nội dung khác của bạn */}
            </div>
            <div className="list_vote">
                <div className="list_vote_header">
                    <h2>Danh sách bình chọn đang diễn ra:</h2>
                    {/* Nếu có thể tạo bình chọn thì hiển thị nút, nếu không thì vô hiệu hóa */}
                    <Link 
                        to="/create-poll" 
                        state={{ authorId: user?._id }} 
                        className="create_vote_button" 
                        onClick={handleCreatePollClick} // Gọi hàm xử lý khi click
                    >
                        Tạo bình chọn
                    </Link>
                </div>
                <div className="list_item_vote">
                    {/* Render danh sách các cuộc vote */}
                    <ListPoll vote={voting} />
                </div>
            </div>
            {walletAddress && <div className="list_vote">
                <h2>Danh sách bình chọn nâng cao với smartcontract:</h2>
                <div className="list_item_vote">
                    <ListPoll vote={voteSM} />
                </div>
            </div>}
            <div className="list_vote">
                <h2>Danh sách bình chọn đã kết thúc:</h2>
                <div className="list_item_vote">
                    <ListPoll vote={voted} />
                </div>
            </div>
        </div>
    );
};
