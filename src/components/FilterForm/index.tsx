import { FormEvent, ReactNode } from "react";
import "./style.scss";

type FilterFormProps = {
  children: ReactNode;
  onSubmit: Function;
};

export function FilterForm(props: FilterFormProps) {
  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    props.onSubmit();
  }

  return (
    <div className="filter_form" onSubmit={handleSubmit}>
      <form>
        {props.children}
        <button type="submit">Filtrar</button>
      </form>
    </div>
  );
}
