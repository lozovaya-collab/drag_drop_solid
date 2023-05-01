import { Combobox, TextInput, TextArea } from '../../../components';

import style from './style.module.scss';

const ContentPopup = ({ newTask, updateTask }) => {
  const statuses =  [
        {
          id: 1,
          name: "сделать",
        },
        {
          id: 2,
          name: "в процессе",
        },
        {
          id: 3,
          name: "закончено",
        },
  ]
  
  const updateValue = (event, prop) => {
    if(prop === 'title') updateTask({ [prop]: event})
    else updateTask({ [prop]: event.target.value})
  }

  return (
    <>
      {newTask &&
        <div className={style['content-task']}>
          <Combobox
            value={newTask().status_id}
            onChange={(e) => updateValue(e, 'status_id')}
            list={statuses}
          />
          <TextInput
              value={newTask().title}
              onChange={(e) => updateValue(e, 'title')}
              type={'text'}
          />
          <TextArea
            value={newTask().description}
            onChange={(e) => updateValue(e, 'description')}
          />
        </div>
      }
    </>
  )
}

export { ContentPopup }

