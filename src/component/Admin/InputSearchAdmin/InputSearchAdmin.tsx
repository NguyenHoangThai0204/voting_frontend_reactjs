// import { InputAdornment, Paper, TextField } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import { useState, useEffect } from 'react';
// import { getAllUser } from '../../../api/CallApi';
// import { User } from '../../../typeObject';
// import { useNavigate } from 'react-router-dom';
// import './InputSearchAdmin.css';

// export const InputSearchAdmin = () => {
//   const [searchValue, setSearchValue] = useState<string>("");
//   const [users, setUsers] = useState<User[]>([]);
//   const [results, setResults] = useState<User[]>([]);
//   const navigate = useNavigate();

//   const handleText = () => {
//     setSearchValue('');
//   };

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await getAllUser();
//         setUsers(Array.isArray(response.data) ? response.data : []);
//       } catch (error) {
//         console.error('Failed to fetch users:', error);
//       }
//     };
//     fetchUsers();
//   }, []);

//   useEffect(() => {
//     const filteredResults = users.filter(user => user.fullName && user.fullName.toLowerCase().includes(searchValue.toLowerCase()));
//     setResults(filteredResults);
//   }, [searchValue, users]);

//   const handleClick = (userId: string) => {
//     handleText();
//     navigate(`/home/getUserByid`, { state: { id: userId } });
//   };

//   return (
//     <div className="inputSearchAdmin">
//       <TextField
//         id="outlined-basic"
//         value={searchValue}
//         onChange={(e) => setSearchValue(e.target.value)}
//         className="search"
//         label="Search"
//         variant="outlined"
//         size="small"
//         InputProps={{
//           endAdornment: (
//             <InputAdornment position="end">
//               <SearchIcon />
//             </InputAdornment>
//           )
//         }}
//       />
//       {searchValue && (
//         <Paper className="results">
//           {results.map((user) => (
//             <div className="result-item" key={user._id}>
//               <p style={{ fontSize: "18px" }} onClick={() => handleClick(user._id)}>
//                 {user.fullName}
//               </p>
//             </div>
//           ))}
//         </Paper>
//       )}
//     </div>
//   );
// };





import { InputAdornment, Paper, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect, useRef } from 'react';
import { getAllUser } from '../../../api/CallApi';
import { User } from '../../../typeObject';
import { useNavigate } from 'react-router-dom';
import './InputSearchAdmin.css';

export const InputSearchAdmin = () => {
  const [searchValue, setSearchValue] = useState<string>('');  // Lưu giá trị tìm kiếm
  const [users, setUsers] = useState<User[]>([]);  // Lưu danh sách người dùng
  const [results, setResults] = useState<User[]>([]);  // Lưu kết quả tìm kiếm
  const [showResults, setShowResults] = useState<boolean>(false);  // Kiểm tra xem có hiển thị kết quả không
  const navigate = useNavigate();
  const resultsRef = useRef<HTMLDivElement>(null);  // Dùng ref để tham chiếu tới vùng kết quả

  const handleText = () => {
    setSearchValue('');  // Xóa giá trị tìm kiếm
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUser();
        setUsers(Array.isArray(response.data) ? response.data : []);  // Lấy danh sách người dùng
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };
    fetchUsers();
  }, []);

  // Lọc kết quả người dùng khi có ký tự tìm kiếm
  useEffect(() => {
    if (searchValue === '') {
      setResults(users);  // Nếu không tìm kiếm, hiển thị tất cả người dùng
    } else {
      const filteredResults = users.filter(user =>
        user.fullName && user.fullName.toLowerCase().includes(searchValue.toLowerCase())  // Lọc theo tên
      );
      setResults(filteredResults);
    }
  }, [searchValue, users]);

  const handleClick = (userId: string) => {
    handleText();
    setShowResults(false);  // Ẩn kết quả sau khi nhấn vào một người dùng
    navigate(`/home/getUserByid`, { state: { id: userId } });
  };

  const handleSearchIconClick = () => {
    setShowResults(true);  // Hiển thị kết quả khi nhấn vào icon tìm kiếm
  };

  // Xử lý sự kiện click ngoài khu vực kết quả
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (resultsRef.current && !resultsRef.current.contains(event.target as Node)) {
        setShowResults(false);  // Ẩn kết quả khi click ngoài
      }
    };

    // Thêm sự kiện khi component được render
    document.addEventListener('mousedown', handleClickOutside);

    // Dọn dẹp sự kiện khi component bị unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="inputSearchAdmin">
      <TextField
        id="outlined-basic"
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
          setShowResults(true);  // Hiển thị kết quả ngay khi người dùng nhập
        }}
        className="search"
        label="Tìm kiếm"
        variant="outlined"
        size="small"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" onClick={handleSearchIconClick}>
              <SearchIcon />
            </InputAdornment>
          )
        }}
      />
      
      {/* Hiển thị kết quả tìm kiếm nếu showResults là true */}
      {showResults && results.length > 0 && (
        <Paper className="results" sx={{ width: '600px' }} ref={resultsRef}>
          {results.map((user) => (
            <div className="result-item" key={user._id}>
              <p style={{ fontSize: "18px" }} onClick={() => handleClick(user._id)}>
                {user.fullName}
              </p>
            </div>
          ))}
        </Paper>
      )}
    </div>
  );
};
