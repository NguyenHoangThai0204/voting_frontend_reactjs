import { useContext, useEffect, useState } from 'react';
import "./HeaderHomeLayout.css";
import { InputAdornment, Paper, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { HeaderHomeLogin } from "../HeaderHomeLogin/HeaderHomeLogin";
import { HeaderHomeLoggedin } from "../HeaderHomeLoggedin/HeaderHomeLoggedinLayout/HeaderHomeLoggedin";
import { AuthContext } from '../../../../contextapi/AuthContext';
import { Vote } from '../../../../typeObject';
import { getAllVotes } from '../../../../api/CallApi';
import { Link } from 'react-router-dom'; // Import Link for navigation

export const HeaderHomeLayout = () => {
  const authContext = useContext(AuthContext);
  const [votes, setVotes] = useState<Vote[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [results, setResults] = useState<Vote[]>([]);
  const { user } = authContext!;

  const handeleText = ()=>{
    setSearchValue('');
  }

  useEffect(() => {
    const fetchVotes = async () => {
      try {
        const response = await getAllVotes(user?._id?.toString() ?? '');
        setVotes(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Failed to fetch votes:', error);
      }
    };
    fetchVotes();
  }, [user]);

  useEffect(() => {
    const filteredResults = votes.filter(vote => vote.title.toLowerCase().includes(searchValue.toLowerCase()));
    setResults(filteredResults);
  }, [searchValue, votes]);

  return (
    <div className="header_home">
      <div className="header_home_content">
        <div className="header_home_title">
          <h1>Voting App</h1>
          <p>Chọn theo cách của bạn</p>
        </div>
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
            <Paper className="search_results">
              {results.map((vote) => (
                <Link
                  onClick={handeleText}
                  to="/detail-vote"
                  state={{ id: vote._id }}
                >
                  <div className='itemSearch'  >
                    {vote.title}
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
