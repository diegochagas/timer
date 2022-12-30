import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { differenceInSeconds } from 'date-fns'

import * as S from './styles'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'report the task'),
  minutesAmount: zod
    .number()
    .min(5, 'The cicle must be at least 5 minutes')
    .max(60, 'The cicle must be a maximum of 60 minutes')
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
  id: string,
  task: string,
  minutesAmount: number,
  startDate: Date 
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
  
  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)
  
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  })
  
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const totalMinutesAmount = Math.floor(currentSeconds / 60)
  const totalSecondsAmount = currentSeconds % 60

  const minutes = String(totalMinutesAmount).padStart(2, '0')
  const seconds = String(totalSecondsAmount).padStart(2, '0')
  
  const task = watch('task')
  const minutesAmount = watch('minutesAmount')
  const isSubmitDisabled = !task || !minutesAmount || minutesAmount < 5

  useEffect(() => {
    if (activeCycle) {
      setInterval(() => {
        setAmountSecondsPassed(differenceInSeconds(new Date(), activeCycle.startDate))
      }, 1000)
    }
  }, [activeCycle])

  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()
    }

    setCycles(state => [...state, newCycle])
    setActiveCycleId(id)

    reset()
  }

  return (
    <S.HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <S.FormContainer>
          <label htmlFor="task">I will work at</label>

          <S.TaskInput
            id="task"
            type="text"
            placeholder="Give a name to your project"
            list="task-suggestions"
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
            step={5}
            min={5}
            max={60}
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutes.</span>
        </S.FormContainer>

        <S.CountDownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <S.Separator>:</S.Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </S.CountDownContainer>

        <S.StartCountdownButton type="submit" disabled={isSubmitDisabled}>
          <Play size={24} />

          Start
        </S.StartCountdownButton>
      </form>
    </S.HomeContainer>
  )
}