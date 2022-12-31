import * as S from './styles'

export function NewCycleForm() {
  return (
    <S.FormContainer>
      <label htmlFor="task">I will work at</label>

      <S.TaskInput
        id="task"
        type="text"
        placeholder="Give a name to your project"
        list="task-suggestions"
        disabled={!!activeCycle}
        {...register('task')}
      />

      <datalist id="task-suggestions">
        <option value="Project 1" />
        <option value="Project 2" />
        <option value="Project 3" />
        <option value="Project 4" />
      </datalist>

      <label htmlFor="minutesAmount">for</label>

      <S.MinutesAmountInput
        type="number"
        id="minutesAmount"
        placeholder="00"
        step={1}
        min={1}
        max={60}
        disabled={!!activeCycle}
        {...register('minutesAmount', { valueAsNumber: true })}
      />

      <span>minutes.</span>
    </S.FormContainer>
  )
}