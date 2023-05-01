import { createSignal } from "solid-js";

import { apiService } from "../../../shared/api/swagger/swagger";

import { Popup, Button, ContentPopup } from '../../../components';

const CreateTaskPopup = ({ isDialog, show, updateTasks }) => {
  const closePopup = () => {
    show(false);
  }

  const [task, setTask] = createSignal({
    status_id: isDialog,
    title: "",
    description: "",
  })

  const updateTask = (newTask) => {
    console.log('task', newTask)
    setTask({ ...task(), ...newTask });
    console.log(task())
  }

  const saveTask = () => {
    console.log(task())
    apiService.tasks.Create(task()).then(() => {
      apiService.tasks
        .Get()
        .then((res) => {
          updateTasks(res.data);
        })
        .then(() => {
          closePopup();
        });
    });
  };

  const titleElement = () => {
    return (
      <>создать задачу</>
    )
  }

  const contentElement = () => {
    return (
      <>
        <ContentPopup newTask={task} updateTask={(value) => updateTask({...task, ...value})} />
      </>
    )
  }

  const actionsElement = () => {
    return (
      <>
        <Button onClick={closePopup} type={'text'}>ОТМЕНА</Button>
        <Button onClick={saveTask}>СОХРАНИТЬ</Button>
      </>
    )
  }

  return (
    <Popup
      isOpen={isDialog}
      title={titleElement()}
      content={contentElement()}
      actions={actionsElement()}
    />
  )
}

export { CreateTaskPopup }
