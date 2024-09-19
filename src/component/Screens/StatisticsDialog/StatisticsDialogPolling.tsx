// StatisticsDialog.tsx
import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { getPollById } from '../../../api/CallApi';
import { Poll } from '../../../typeObject';
import './StatisticsDialogPolling.css'; // Import CSS cho cuộc đua thú

interface StatisticsDialogProps {
  open: boolean;
  handleClose: () => void;
  pollId: string;
}

// Danh sách emoji con vật
const animalEmojis = ['🐎', '🦁', '🐘', '🐼', '🐶', '🐱'];

const StatisticsDialogPolling: React.FC<StatisticsDialogProps> = ({ open, handleClose, pollId }) => {
  const [poll, setPoll] = useState<Poll | null>(null);
  const [totalVotes, setTotalVotes] = useState<number>(0);

  useEffect(() => {
    const fetchVote = async () => {
      try {
        const response = await getPollById(pollId);
        setPoll(response.data);
        const total = response.data.options.reduce((acc, option) => acc + option.votes.length, 0);
        setTotalVotes(total);
      } catch (error) {
        console.error('Error fetching vote data:', error);
      }
    };
    if (pollId && open) {
      fetchVote();
    }
  }, [pollId, open]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Live Race Statistics</DialogTitle>
      <DialogContent>
        {poll ? (
          <div>
            {poll.options.map((option, index) => {
              // Lấy emoji con vật từ danh sách, đảm bảo không vượt quá số lượng có sẵn
              const animalEmoji = animalEmojis[index % animalEmojis.length];
              const votePercentage = (option.votes.length / totalVotes) * 100 || 0;
              return (
                <div key={option._id} className="race-container">
                  <div className="animal-name">{option.contentOption}</div>
                  <div className="track">
                    <div className="animal" style={{ width: `${votePercentage}%` }}>
                      {animalEmoji}
                    </div>
                  </div>
                  <div className="vote-count">{option.votes.length} votes</div>
                </div>
              );
            })}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StatisticsDialogPolling;
