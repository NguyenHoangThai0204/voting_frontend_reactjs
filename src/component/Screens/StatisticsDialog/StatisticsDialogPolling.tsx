import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { getPollById } from '../../../api/CallApi';
import { Poll } from '../../../typeObject';
import './StatisticsDialogPolling.css';

interface StatisticsDialogProps {
  open: boolean;
  handleClose: () => void;
  pollId: string;
}

const animalEmojis = [
  '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', 
  '🦁', '🐮', '🐷', '🐸', '🐵', '🐧', '🐦', '🐤', '🐣', '🐺', 
  '🦄', '🐴', '🦓', '🐘', '🦏', '🦛', '🐪', '🐫', '🦙', '🦒', 
  '🦘', '🦔', '🐾', '🐉', '🐲', '🐊', '🐢', '🦎', '🐍', '🐅',
  '🐆', '🦕', '🦖', '🐋', '🐳', '🐬', '🦈', '🐟', '🐠', '🐡',
  '🦐', '🦑', '🦞', '🦀', '🐙'
];

const StatisticsDialogPolling: React.FC<StatisticsDialogProps> = ({ open, handleClose, pollId }) => {
  const [poll, setPoll] = useState<Poll | null>(null);
  const [totalVotes, setTotalVotes] = useState<number>(0);
  const [animalEmojisState, setAnimalEmojisState] = useState<string[]>([]); // Lưu emoji đã chọn

  useEffect(() => {
    const fetchVote = async () => {
      try {
        const response = await getPollById(pollId);
        setPoll(response.data);
        const total = response.data.options.reduce((acc, option) => acc + option.votes.length, 0);
        setTotalVotes(total);

        // Chỉ tạo emoji một lần khi poll được load lần đầu tiên
        const selectedEmojis = response.data.options.map(() =>
          animalEmojis[Math.floor(Math.random() * animalEmojis.length)]
        );
        setAnimalEmojisState(selectedEmojis); // Lưu emoji vào state
      } catch (error) {
        console.error('Error fetching vote data:', error);
      }
    };

    if (pollId && open && animalEmojisState.length === 0) {
      fetchVote(); // Chỉ fetch data và chọn emoji khi mở lần đầu
    }
  }, [pollId, open, animalEmojisState.length]);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="md">
      <DialogTitle>Live Race Statistics</DialogTitle>
      <DialogContent>
        {poll ? (
          <div>
            {poll.options.map((option, index) => {
              const votePercentage = (option.votes.length / totalVotes) * 100 || 0;
              return (
                <div key={option._id} className="race-container">
                  <div className="animal-name">{option.contentOption}</div>
                  <div className="track">
                    <div className="animal" style={{ width: `${votePercentage}%` }}>
                      {animalEmojisState[index]} {/* Sử dụng emoji từ state */}
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
