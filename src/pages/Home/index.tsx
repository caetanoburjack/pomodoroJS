import { useForm } from "react-hook-form";
import { Play } from "phosphor-react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinuteAmountInput,
  Separator,
  StartCountdownButton,
  TaskInput,
} from "./styles";

export function Home() {
  const { register, handleSubmit, watch } = useForm();

  function handleCreateNewTask(data: any) {
    console.log(data);
  }

  const task = watch("task");
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewTask)} action="">
        <FormContainer>
          <label htmlFor="">Vou trabalhar em</label>
          <TaskInput
            list="task-sugestions"
            id="task"
            placeholder="Nomeie essa atividade!"
            {...register("task")}
          />

          <datalist id="task-sugestions">
            <option value="Trabalhar no Projeto X"></option>
            <option value="Trabalhar no Projeto Y"></option>
            <option value="Ler o Livro X"></option>
            <option value="Assistir o documentário X"></option>
          </datalist>

          <label htmlFor="">por</label>
          <MinuteAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            {...register("minutesAmount", { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton disabled={isSubmitDisabled} type="submit" id="">
          <Play size={24} />
          Iniciar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  );
}
