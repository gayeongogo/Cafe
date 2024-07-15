import React from "react";
import { Link } from 'react-router-dom';

export default function AppShell() {
  return (
    <div>
      <Link to='/home'>홈</Link>
      <Link to='/recode'>기록하기</Link>
    </div>
  )
}
