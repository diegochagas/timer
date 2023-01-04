import { useContext } from 'react'
import { formatDistanceToNow } from 'date-fns'

import { CyclesContext } from '../../contexts/CyclesContext'

import * as S from './styles';

export function History() {
  const { cycles } = useContext(CyclesContext)

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
            {cycles.map(cycle => (
              <tr key={cycle.id}>
                <td>{cycle.task}</td>
                <td>{cycle.minutesAmount} minutes</td>
                <td>
                  {formatDistanceToNow(cycle.startDate, {
                    addSuffix: true
                  })}
                </td>
                <td>
                  {cycle.finishedDate && <S.Status statusColor="green">Done</S.Status>}

                  {cycle.interruptedDate && <S.Status statusColor="red">Interrupted</S.Status>}

                  {!cycle.finishedDate && !cycle.interruptedDate && <S.Status statusColor="yellow">In progress</S.Status>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </S.HistoryList>
    </S.HistoryContainer>
  )
}