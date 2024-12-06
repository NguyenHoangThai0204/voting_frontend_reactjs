import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getAllUser } from '../../../api/CallApi';
import { User } from '../../../typeObject';
import './UserStatistics.css'

const UserStatistics = () => {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [allUsersSignUpInMonth, setAllUsersSignUpInMonth] = useState<User[]>([]);
  const [allUsersSignUpLastMonth, setAllUsersSignUpLastMonth] = useState<User[]>([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await getAllUser();
        const users = Array.isArray(response.data) ? response.data : [response.data];
        setAllUsers(users);

        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        const usersInCurrentMonth = users.filter(user => {
          const signUpDate = new Date(user.timeCreateSignup);
          return (
            signUpDate.getMonth() === currentMonth &&
            signUpDate.getFullYear() === currentYear
          );
        });

        const usersInLastMonth = users.filter(user => {
          const signUpDate = new Date(user.timeCreateSignup);
          return (
            signUpDate.getMonth() === (currentMonth === 0 ? 11 : currentMonth - 1) &&
            signUpDate.getFullYear() === (currentMonth === 0 ? currentYear - 1 : currentYear)
          );
        });

        setAllUsersSignUpInMonth(usersInCurrentMonth);
        setAllUsersSignUpLastMonth(usersInLastMonth);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu người dùng:', error);
      }
    };

    fetchAllUsers();
  }, []);

  const currentCount = allUsersSignUpInMonth.length;
  const lastMonthCount = allUsersSignUpLastMonth.length;
  const growthPercentage = lastMonthCount
    ? ((currentCount - lastMonthCount) / lastMonthCount) * 100
    : 100;

  const pieData = [
    { name: 'Số người đăng kí trong tháng hiện tại', value: currentCount },
    { name: 'Số người đăng kí trong tháng trước', value: lastMonthCount },
  ];

  const COLORS = ['#0088FE', '#FFBB28'];

  return (
    <div style={{ marginBottom: '20px' }}>
      <h2>Thống kê người dùng</h2>
      {/* Biểu đồ tròn tự động điều chỉnh */}
      <div style={{textAlign:'center'}}>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      <h3>Biểu đồ thống kê người đăng kí <br/> hiện tại so với tháng trước</h3>
      </div>
      <p>Số lượng người dùng đăng ký trong tháng: {currentCount}</p>
      <p>Tổng số người dùng hiện tại: {allUsers.length}</p>
      <p>
        Tỷ lệ tăng trưởng so với tháng trước: {growthPercentage.toFixed(2)}%
      </p>

    </div>
    
  );
};

export default UserStatistics;
