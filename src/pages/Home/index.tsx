import { useForm } from "react-hook-form";
import { Play } from "phosphor-react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

import {
  //importing styled components from styles
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinuteAmountInput,
  Separator,
  StartCountdownButton,
  TaskInput,
} from "./styles";
import { useState } from "react";

const newTaskFormValidationSchema = zod.object({
  //I'm creating this schema to send to zodResolver().
  task: zod.string().min(1, "Define a task, please!"),
  minutesAmount: zod.number().min(5).max(60),
});

interface taskInterface {
  // I can use an interface to define the struture of a task or...
  task: string;
  minutesAmount: number;
}

// ... i can define a type, getting the type from zod... take a look
type taskType = zod.infer<typeof newTaskFormValidationSchema>;
// ... so i can use it as a generic on useForm<> instead of an interface.

interface Task {
  id: string;
  task: string;
  minutesAmount: number;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentTaskId, setCurrentTaskId] = useState<string | null>(null);
  const [elapsedTimeInSeconds, setElapsedTimeInSeconds] = useState(0);

  const { register, handleSubmit, watch, formState, reset } = useForm<taskType>(
    // the [reset] function clean all the inputs, turning back to the default
    // values defined bellow on resolver;
    // [useForm<>]here i can pass a generic (<taskInterface> or <taskType>)
    // formState bring some data related to the data insertion on the form
    // I can send an config object with some parameters
    {
      resolver: zodResolver(newTaskFormValidationSchema), // here i choose a resolver, in this case 'zodResolver()'.
      // zodResolver needs to receive as config ojbect having the schema of validations
      defaultValues: {
        task: "",
        minutesAmount: 0,
      },
    }
  ); //register points what are the inputs I have on my form
  // function register receive a name and return all functions related to inputs, like onchange, onblur, onfocus
  // function watch is used to watch some field
  function handleCreateNewTask(data: taskInterface) {
    const id = String(new Date().getTime());
    const newTask: Task = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
    };

    setCurrentTaskId(id);

    setTasks((state) => [...tasks, newTask]);

    console.log(data);
    console.log(currentTask);
    reset();
  }

  const currentTask = tasks.find((task) => task.id === currentTaskId);

  const currentTaskTimeInSeconds = currentTask
    ? currentTask.minutesAmount * 60
    : 0;
  const currentTaskLeftTimeInSeconds = currentTask
    ? currentTaskTimeInSeconds - elapsedTimeInSeconds
    : 0;

  const currentTaskTimeInMinutes = Math.floor(currentTaskTimeInSeconds / 60);
  const currentTaksRemainingTimeInSeconds = currentTaskLeftTimeInSeconds % 60;

  const currentTaskFormattedTimeInMinutes = String(
    currentTaskTimeInMinutes
  ).padStart(2, "0");
  const currentTaskFormattedTimeInSeconds = String(
    currentTaksRemainingTimeInSeconds
  ).padStart(2, "0");

  console.log(formState.errors);
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
            {...register("task")} // here I'm declaring an input an given him the name 'task'
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
            {...register("minutesAmount", { valueAsNumber: true })} // I can send as argument for register, a config object having some parameters
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>{currentTaskFormattedTimeInMinutes[0]}</span>
          <span>{currentTaskFormattedTimeInMinutes[1]}</span>
          <Separator>:</Separator>
          <span>{currentTaskFormattedTimeInSeconds[0]}</span>
          <span>{currentTaskFormattedTimeInSeconds[1]}</span>
        </CountdownContainer>

        <StartCountdownButton disabled={isSubmitDisabled} type="submit" id="">
          <Play size={24} />
          Iniciar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  );
}
