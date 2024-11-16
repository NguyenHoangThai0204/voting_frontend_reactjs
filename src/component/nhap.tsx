// npm install socket.io-client

// import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
// import Button from '@mui/material/Button';
// import { getPollById } from '../../../api/CallApi';
// import { Poll } from '../../../typeObject';
// import './StatisticsDialogPolling.css';

// const socket = io('http://your-server-url'); // Thay thế bằng URL của server

// const StatisticsDialogPolling = ({ open, handleClose, pollId }) => {
//   const [poll, setPoll] = useState(null);
//   const [totalVotes, setTotalVotes] = useState(0);
//   const [animalEmojisState, setAnimalEmojisState] = useState([]);
//   const [remainingTime, setRemainingTime] = useState(null);

//   useEffect(() => {
//     const fetchVote = async () => {
//       try {
//         const response = await getPollById(pollId);
//         setPoll(response.data);
//         const total = response.data.options.reduce((acc, option) => acc + option.votes.length, 0);
//         setTotalVotes(total);

//         const selectedEmojis = response.data.options.map(() =>
//           animalEmojis[Math.floor(Math.random() * animalEmojis.length)]
//         );
//         setAnimalEmojisState(selectedEmojis);
//       } catch (error) {
//         console.error('Error fetching vote data:', error);
//       }
//     };

//     if (pollId && open) {
//       fetchVote();
//     }
//   }, [pollId, open]);

//   useEffect(() => {
//     socket.on('pollUpdated', (updatedPoll) => {
//       if (updatedPoll.id === pollId) {
//         setPoll(updatedPoll);
//         const total = updatedPoll.options.reduce((acc, option) => acc + option.votes.length, 0);
//         setTotalVotes(total);
//         const selectedEmojis = updatedPoll.options.map(() =>
//           animalEmojis[Math.floor(Math.random() * animalEmojis.length)]
//         );
//         setAnimalEmojisState(selectedEmojis);
//       }
//     });

//     return () => {
//       socket.off('pollUpdated');
//     };
//   }, [pollId]);

//   const getRemainingTime = (endTime) => {
//     const timeLeft = new Date(endTime).getTime() - new Date().getTime();
//     const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
//     const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//     const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
//     const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
//     return { days, hours, minutes, seconds };
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (poll && poll.timeEnd) {
//         const { days, hours, minutes, seconds } = getRemainingTime(poll.timeEnd);
//         setRemainingTime(`${days}d ${hours}h ${minutes}m ${seconds}s`);
//       }
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [poll]);

//   return (
//     <Dialog open={open} onClose={handleClose}>
//       <DialogTitle>Live Race Statistics</DialogTitle>
//       <DialogContent>
//         {poll ? (
//           poll.options.map((option, index) => {
//             const votePercentage = (option.votes.length / totalVotes) * 100 || 0;
//             return (
//               <div key={option.id} className="option">
//                 <span>{option.contentOption}</span>
//                 <span className="emoji">{animalEmojisState[index]}</span>
//                 <span>{option.votes.length} votes</span>
//               </div>
//             );
//           })
//         ) : (
//           <div>Loading...</div>
//         )}
//       </DialogContent>
//       <DialogActions>
//         {remainingTime ? (
//           <div>Remaining time: {remainingTime}</div>
//         ) : null}
//         <Button onClick={handleClose}>Close</Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default StatisticsDialogPolling;