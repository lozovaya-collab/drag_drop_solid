import { createSignal, createEffect } from "solid-js";

import { apiService } from "../../../shared/api/swagger/swagger";

import { Popup, Button, ContentPopup } from '../../../components';

const EditTaskPopup = ({ isDialog, show, user, updateTasks }) => {
  const [task, setTask] = createSignal({
    status_id: -1,
    title: "",
    description: "",
  });

  const closePopup = () => {
    show(false);
  };

  const updateTask = (newTask) => {
    setTask(newTask);
  };

  const saveTask = () => {
    console.log(task)
    apiService.tasks
      .Update(task().id, {
        status_id: task().status_id,
        description: task().description,
        title: task().title,
      })
      .then(() => {
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
      <>редактировать задачу</>
    )
  };

  const contentElement = () => {
    return (
      <>
        <div>
          <ContentPopup newTask={task} updateTask={(value) => updateTask({...task(), ...value})} />
        </div>
      </>
    )
  };

  const actionsElement = () => {
    return (
      <>
        <Button onClick={closePopup} type={'text'}>ОТМЕНА</Button>
        {task && task.author_id === user &&
          <Button onClick={saveTask}>СОХРАНИТЬ</Button>
        }
      </>
    )
  };

  createEffect(() => { 
    apiService.tasks.GetById(isDialog).then((res) => {
      updateTask(res.data);
    });
  }, []);

  return (
    <Popup
      isOpen={isDialog}
      title={titleElement()}
      content={contentElement()}
      actions={actionsElement()}
    />
  )
}

export { EditTaskPopup }