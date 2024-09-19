
import { InputAdornment, Paper, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
// import { Link } from 'react-router-dom';
import { useState } from 'react';

export const InputSearchAdmin = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  // const [results, setResults] = useState<Poll[]>([]);
  // const handeleText = () => {
  //   setSearchValue('');
  // }
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
            <Paper className="search_results">
              {/* {results.map((poll) => (
                <Link
                  onClick={handeleText}
                  key={poll._id} // Thêm key duy nhất cho mỗi phần tử
                  to="/detail-poll"
                  state={{ id: poll._id }}
                >
                  <div className='itemSearch'>
                    {poll.title}
                  </div>
                </Link>
              ))} */}

            </Paper>
          )}
        </div>
  )
}
