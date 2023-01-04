import { useContext } from 'react'
import { HandPalm, Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider } from 'react-hook-form'

import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'
import { CyclesContext } from '../../contexts/CyclesContext'

import * as S from './styles'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'report the task'),
  minutesAmount: zod
    .number()
    .min(1, 'The cicle must be at least 1 minutes')
    .max(60, 'The cicle must be a maximum of 60 minutes')
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
  const { activeCycle, createNewCycle, interruptCurrentCycle } = useContext(CyclesContext)
  
  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  })

  const { handleSubmit, watch, reset } = newCycleForm
  
  const task = watch('task')
  const minutesAmount = watch('minutesAmount')
  const isSubmitDisabled = !task || !minutesAmount || minutesAmount < 1

  return (
    <S.HomeContainer>
      <form onSubmit={handleSubmit(createNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
      
        <Countdown />

        {activeCycle ? (
          <S.StopCountdownButton type="button" onClick={interruptCurrentCycle}>
            <HandPalm size={24} />

            Interrupt
          </S.StopCountdownButton>
        ) : (
          <S.StartCountdownButton type="submit" disabled={isSubmitDisabled}>
            <Play size={24} />

            Start
          </S.StartCountdownButton>
        )}
      </form>
    </S.HomeContainer>
  )
}