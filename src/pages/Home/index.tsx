import { Play } from 'phosphor-react'

import * as S from './styles';

export function Home() {
  return (
    <S.HomeContainer>
      <form action="">
        <S.FormContainer>
          <label htmlFor="task">I will work at</label>

          <S.TaskInput id="task" type="text" placeholder="Give a name to your project" list="task-suggestions" />

          <datalist id="task-suggestions">
            <option value="Project 1" />
            <option value="Project 2" />
            <option value="Project 3" />
            <option value="Project 4" />
          </datalist>

          <label htmlFor="minutesAmount">for</label>

          <S.MinutesAmountInput
            type="number"
            name=""
            id="minutesAmount"
            placeholder="00"
            step={5}
            min={5}
            max={60}
          />

          <span>minutes.</span>
        </S.FormContainer>

        <S.CountDownContainer>
          <span>0</span>
          <span>0</span>
          <S.Separator>:</S.Separator>
          <span>0</span>
          <span>0</span>
        </S.CountDownContainer>

        <S.StartCountdownButton type="submit" disabled>
          <Play size={24} />

          Start
        </S.StartCountdownButton>
      </form>
    </S.HomeContainer>
  )
}