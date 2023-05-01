import style from './style.module.scss';

import { createSignal } from 'solid-js';

const TextInput = (props) => {
  const [value, setValue] = createSignal(props.value || '');
  const handleChange = (event) => {
    setValue(event.target.value);
    props.onChange(event.target.value)
  };

  return (
    <input className={style['text-input']} type={props.type || 'text'} placeholder={props.placeholder} value={value()} onInput={handleChange} />
  );
}

export { TextInput }


