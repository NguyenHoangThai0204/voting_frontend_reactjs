import { Link } from "react-router-dom";
import { ListPoll } from "../../ContentListPoll/ListPoll/ListPoll";
import './ContentPollLayout.css';
import { AuthContext } from '../../../../contextapi/AuthContext';
import { useContext, useEffect, useState } from "react";
// import { getAllVoteUser, getAllVoteByUserid, getPollById } from '../../../../api/CallApi';
import { getAllVoteUser, getPollById } from '../../../../api/CallApi';

import { Poll } from '../../../../typeObject';
import Swal from 'sweetalert2';  // Import SweetAlert2
export const ContentPollLayout = () => {
    const authContext = useContext(AuthContext); // Lấy thông tin người dùng
    const { user, walletAddress } = authContext!; // Lấy thêm walletAddress từ AuthContext

    // Khai báo state với kiểu dữ liệu cụ thể
    const [polling, setPolling] = useState<Poll[]>([]);
    const [polled, setPolled] = useState<Poll[]>([]);
    const [pollSM, setPollSM] = useState<Poll[]>([]);

    const [pollPollJoined, setPollPollJoined] = useState<Poll[]>([]);
    const [canCreatePoll, setCanCreatePoll] = useState<boolean>(true); // Kiểm tra xem có thể tạo bình chọn hay không
    const [errorMessage, setErrorMessage] = useState<string>(''); // State để lưu thông báo lỗi

    useEffect(() => {
        const controller = new AbortController(); // Define the controller
        const fetchVotes = async () => {
            if (!user) {
                console.log('User not logged in');
            } else {
                try {
                    const response = await getAllVoteUser(user._id.toString());

                    // Lấy trực tiếp mảng `Vote[]` từ `response.data`
                    const votes: Poll[] = Array.isArray(response.data) ? response.data : [];
                    // Lọc các cuộc bình chọn chưa kết thúc và đã kết thúc
                    const currentVoting = votes.filter(vote => {
                        const parsedTimeEnd = new Date(vote.timeEnd);
                        return vote.typeContent && vote.typeContent !== "privatesmc" &&
                            !isNaN(parsedTimeEnd.getTime()) && parsedTimeEnd.getTime() > new Date().getTime();
                    });

                    const votedVotes = votes.filter(vote => {
                        const parsedTimeEnd = new Date(vote.timeEnd);
                        return vote.typeContent && vote.typeContent !== "privatesmc" &&
                            !isNaN(parsedTimeEnd.getTime()) && parsedTimeEnd.getTime() <= new Date().getTime();
                    });

                    const votedVoteSm = votes.filter(vote => {
                        return vote.typeContent && vote.typeContent === "privatesmc";
                    });
                    setPolling(currentVoting);
                    setPolled(votedVotes);
                    setPollSM(votedVoteSm);

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

                    // Kiểu dữ liệu của listVote phải là một mảng các đối tượng chứa id_vote
                    if (authContext?.user?.listVote && authContext?.user?.listVote.length > 0
                    ) {
                        const listVote = authContext?.user?.listVote;
                        const listPollJoined: Poll[] = [];

                        // Lặp qua từng phần tử trong listVote
                        for (let i = 0; i < listVote.length; i++) {
                            // Kiểm tra xem phần tử trong listVote có phải là đối tượng với id_vote hay không
                            if (typeof listVote[i] === 'object' && listVote[i]?.id_vote) {
                                // Truyền id_vote vào hàm getPollById
                                const vote = await getPollById(listVote[i].id_vote);
                                // if(vote.data.authorId !== authContext?.user?._id) {
                                    listPollJoined.push(vote.data);
                                // }
                            } else {
                                console.error('Danh sách vote không đúng định dạng.');
                            }
                        }

                        setPollPollJoined(listPollJoined);
                    }


                } catch (error) {
                    console.error('Failed to fetch votes:', error);
                }
                
            }
            return () => controller.abort();
        };

        fetchVotes();
    }, [user, walletAddress]
); // Thêm walletAddress vào dependency để theo dõi sự thay đổi

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
            <div className="content_vote" style={{ textAlign: "center" }}>
                <h1>Trang cá nhân</h1>
            </div>
            <div className="list_vote">
                <div style={{ display: "flex", justifyContent: "end" }}>
                    <Link
                        to="/create-poll"
                        state={{ authorId: user?._id }}
                        className="create_vote_button"
                        onClick={handleCreatePollClick} // Gọi hàm xử lý khi click
                    >
                        Tạo bình chọn
                    </Link>
                </div>

                {polling.length > 0 && <div className="list_item_vote">
                    <h2>Danh sách bình chọn đang diễn ra:</h2>
                    <ListPoll vote={polling} />
                </div>}
            </div>
            {pollSM.length > 0 && <div className="list_vote">
                <h2>Danh sách bình chọn nâng cao với smartcontract:</h2>
                <div className="list_item_vote">
                    <ListPoll vote={pollSM} />
                </div>
            </div>}
            {pollPollJoined.length > 0 && <div className="list_vote">
                <h2>Danh sách bình chọn đã tham gia:</h2>
                <div className="list_item_vote">
                    <ListPoll vote={pollPollJoined} />
                </div>
            </div>}
            {polled.length > 0 && <div className="list_vote">
                <h2>Danh sách bình chọn đã kết thúc:</h2>
                <div className="list_item_vote">
                    <ListPoll vote={polled} />
                </div>
            </div>}
            
        </div>
    );
};
