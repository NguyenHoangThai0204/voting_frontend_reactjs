import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllUser, getInforAuthor, getAllVoteUser } from "../../../api/CallApi";
import { User, Poll } from "../../../typeObject";
import "./UsersManagement.css";
import { DetailUsersManagement } from "../DetailUsersManagement/DetailUsersManagement";
import io from "socket.io-client";

// Kết nối Socket.IO đến server
// const socket = io("http://localhost:3000", { transports: ["websocket"] });
const socket = io("https://api.pollweb.io.vn", { transports: ["websocket"] });


export const UsersManagement = () => {
  const location = useLocation();
  //eslint-disable-next-line
  const [users, setUsers] = useState<User[]>([]); // Lưu danh sách người dùng
  const [id, setId] = useState<string>(""); // Lưu id người dùng
  const [userItem, setUserItem] = useState<User | undefined>(); // Lưu thông tin người dùng
  const [polls, setPolls] = useState<Poll[]>([]); // Lưu các poll của người dùng

  // Thiết lập id từ location nếu có
  useEffect(() => {
    if (location.state && location.state.id) {
      setId(location.state.id);
    }
  }, [location.state]);

  // Lấy danh sách người dùng ban đầu và polls của người dùng đầu tiên
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUser();
        const fetchedUsers = Array.isArray(response.data) ? response.data : [response.data];
        setUsers(fetchedUsers);

        if (fetchedUsers.length > 0) {
          const firstUser = fetchedUsers[0];
          setId(firstUser._id);
          setUserItem(firstUser);

          const response2 = await getAllVoteUser(firstUser._id);
          setPolls(Array.isArray(response2.data) ? response2.data : [response2.data]);
        }
      } catch (error) {
        console.error("Error fetching users data:", error);
      }
    };

    fetchUsers();
  }, []);

  // Gọi API lấy thông tin người dùng và polls khi id thay đổi
  useEffect(() => {
    if (id) {
      const fetchUserInfo = async () => {
        try {
          const userResponse = await getInforAuthor(id);
          setUserItem(userResponse.data);

          const pollsResponse = await getAllVoteUser(id);
          setPolls(Array.isArray(pollsResponse.data) ? pollsResponse.data : [pollsResponse.data]);
        } catch (error) {
          console.error("Error fetching user info or polls:", error);
        }
      };

      fetchUserInfo();
    }
  }, [id]);

  // Lắng nghe sự kiện từ server qua Socket.IO
  useEffect(() => {
    // Sự kiện cập nhật polls
    socket.on("updatePolling", (data) => {
      console.log("Received updatePolling event:", data);

      setPolls((prevPolls) =>
        prevPolls.map((poll) =>
          poll._id === data.pollId ? { ...poll, ...data.updatedPoll } : poll
        )
      );
    });

    // Sự kiện thay đổi trạng thái người dùng
    socket.on("user-status-changed", (data: { id: string; status: string }) => {
      console.log("User status changed:", data);

      setUserItem((prevUser) =>
        prevUser && prevUser._id === data.id ? { ...prevUser, status: data.status } : prevUser
      );

    }); 
    socket.on("user-updated", (user) => {
      console.log("User updated:", user);
  
      setUserItem((prevUser) =>
        prevUser && prevUser._id === user._id ? { ...prevUser, ...user } : prevUser
      );
  
      // Làm mới danh sách người dùng
      refreshUserList();
    });
    socket.on("deletePoll", async (data) => {
      console.log("Received deletePoll event:", data);
  
      // Cập nhật lại polls sau khi xóa
      setPolls((prevPolls) =>
        prevPolls.filter((poll) => poll._id !== data.pollId)
      );
  
      // Nếu cần, làm mới lại thông tin người dùng và danh sách các cuộc thăm dò
      if (userItem && userItem._id) {
        const pollsResponse = await getAllVoteUser(userItem._id);
        setPolls(Array.isArray(pollsResponse.data) ? pollsResponse.data : [pollsResponse.data]);
      }
    });
    
    // Cleanup: Hủy lắng nghe sự kiện khi component bị unmount
    return () => {
      socket.off("updatePolling");
      socket.off("user-status-changed");
      socket.off("deletePoll");
      socket.off("user-updated");
    };
  });

  // Hàm làm mới danh sách người dùng
  const refreshUserList = async () => {
    try {
      const response = await getAllUser();
      const fetchedUsers = Array.isArray(response.data) ? response.data : [response.data];
      setUsers(fetchedUsers);
    } catch (error) {
      console.error("Error refreshing user list:", error);
    }
  };

  return (
    <div>
      <DetailUsersManagement
        userItem={userItem}
        pollItem={polls}
        refreshUserList={refreshUserList} // Truyền hàm làm mới danh sách
      />
    </div>
  );
};
