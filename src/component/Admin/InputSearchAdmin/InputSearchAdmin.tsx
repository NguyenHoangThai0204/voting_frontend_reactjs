import { InputAdornment, Paper, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect } from 'react';
import { getAllUser } from '../../../api/CallApi';
import { User } from '../../../typeObject';
import { useNavigate } from 'react-router-dom';
import './InputSearchAdmin.css';

export const InputSearchAdmin = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [results, setResults] = useState<User[]>([]);
  const navigate = useNavigate();

  const handleText = () => {
    setSearchValue('');
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUser();
        setUsers(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const filteredResults = users.filter(user => user.fullName && user.fullName.toLowerCase().includes(searchValue.toLowerCase()));
    setResults(filteredResults);
  }, [searchValue, users]);

  const handleClick = (userId: string) => {
    handleText();
    navigate(`/home/getUserByid`, { state: { id: userId } });
  };

  return (
    <div className="inputSearch">
      <TextField
        id="outlined-basic"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="search"
        label="Search"
        variant="outlined"
        size="small"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          )
        }}
      />
      {searchValue && (
        <Paper className="results">
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
