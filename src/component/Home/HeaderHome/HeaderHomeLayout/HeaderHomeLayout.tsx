import { useContext, useEffect, useState } from 'react';
import "./HeaderHomeLayout.css";
import { InputAdornment, Paper, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { HeaderHomeLogin } from "../HeaderHomeLogin/HeaderHomeLogin";
import { HeaderHomeLoggedin } from "../HeaderHomeLoggedin/HeaderHomeLoggedinLayout/HeaderHomeLoggedin";
import { AuthContext } from '../../../../contextapi/AuthContext';
import { Poll } from '../../../../typeObject';
import { getAllVotes } from '../../../../api/CallApi';
import { Link } from 'react-router-dom'; // Import Link for navigation
import React from 'react';
import imgicon from '../../../../assets/logocompany.jpg';

export const HeaderHomeLayout: React.FC = () => {
  const authContext = useContext(AuthContext);
  const [polls, setPolls] = useState<Poll[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [results, setResults] = useState<Poll[]>([]);
  const { user } = authContext!;

  const handeleText = () => {
    setSearchValue('');
  }

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const response = await getAllVotes();
        if (user !== null) {
          setPolls(Array.isArray(response.data) ? response.data : []);
        } else {
          const publicVotes = Array.isArray(response.data)
            ? response.data.filter(vote => vote.typeContent === 'public')
            : [];
          setPolls(publicVotes);
        }

      } catch (error) {
        console.error('Failed to fetch votes:', error);
      }
    };
    fetchPolls();
  }, [user]);

  useEffect(() => {
    const filteredResults = polls.filter(poll => poll.title.toLowerCase().includes(searchValue.toLowerCase()));
    setResults(filteredResults);
  }, [searchValue, polls]);

  return (
    <div className="header_home">
      <div className="header_home_content">
        <img src={imgicon} alt='logo' />
        <div className="header_home_title">
          <h2>T&M COMPANY</h2>
          <p style={{margin:0}}>Chọn theo cách của bạn</p>
        </div>
        <div className="inputSearch">
          <TextField
            id="outlined-basic"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="search"
            label="Tìm kiếm tên"
            variant="outlined"
            disabled={authContext?.user?.role === 'admin'}
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
            <Paper className="search_results">
              {results.map((poll) => (
                <Link
                  onClick={handeleText}
                  key={poll._id} // Thêm key duy nhất cho mỗi phần tử
                  to={`/detail-poll/${poll._id}`} 
                  state={{ id: poll._id }}
                >
                  <div className='itemSearch'>
                    {poll.title}
                  </div>
                </Link>
              ))}

            </Paper>
          )}
        </div> 
        <div className="formLogin">
          {authContext?.isLogged ? <HeaderHomeLoggedin /> : <HeaderHomeLogin />}
        </div>
      </div>
    </div>
  );
};
