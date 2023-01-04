import { useContext } from 'react'

import { CyclesContext } from '../../contexts/CyclesContext'

import * as S from './styles';

export function History() {
  const { cycles } = useContext(CyclesContext)

  return (
    <S.HistoryContainer>
      <h1>My history</h1>

      <pre>
        {JSON.stringify(cycles, null, 2)}
      </pre>

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
                <td>
                  <S.Status statusColor={td <= 3 && 'yellow' || td > 3 && td < 6 && 'red' || 'green'}>
                    {td <= 3 && 'In progress' || td > 3 && td < 6 && 'Interrupted' || 'Done'}
                  </S.Status>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </S.HistoryList>
    </S.HistoryContainer>
  )
}