import { differenceInSeconds } from 'date-fns'
import { useContext, useEffect, useState } from 'react'

import { CyclesContext } from '../..'

import * as S from './styles'

export function Countdown() {
  const { activeCycle, activeCycleId, markCurrentCycleAsFinished } = useContext(CyclesContext)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0) 

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const totalMinutesAmount = Math.floor(currentSeconds / 60)
  const totalSecondsAmount = currentSeconds % 60

  const minutes = String(totalMinutesAmount).padStart(2, '0')
  const seconds = String(totalSecondsAmount).padStart(2, '0')
  
  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(new Date(), activeCycle.startDate)

        if (secondsDifference >= totalSeconds) {
          markCurrentCycleAsFinished()

          setAmountSecondsPassed(totalSeconds)

          clearInterval(interval)
        } else {
          setAmountSecondsPassed(secondsDifference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, totalSeconds, activeCycleId, markCurrentCycleAsFinished])

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds, activeCycle])

  return (
    <S.CountDownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <S.Separator>:</S.Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
  </S.CountDownContainer>
  )
}