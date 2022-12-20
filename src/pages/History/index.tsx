import React from 'react';

import * as S from './styles';

export function History() {
  return (
    <S.HistoryContainer>
      <h1>My history</h1>

      <S.HistoryList>
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Duration</th>
              <th>Start</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5, 6, 7].map(td => (
              <tr key={td}>
                <td>Task</td>
                <td>20 minutes</td>
                <td>2 months ago</td>
                <td>Done</td>
              </tr>
            ))}
          </tbody>
        </table>
      </S.HistoryList>
    </S.HistoryContainer>
  )
}