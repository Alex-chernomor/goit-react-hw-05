import { Formik, Form, Field } from 'formik';
import css from './SearchBar.module.css';
import AddBtn from '../Button/Button';

export default function SearchBar({onSearch, value, onChange}) {

  return (
    <div>
           <Formik
             initialValues={{
               topic:value,
              }}
              onSubmit={() => {
                onSearch();
              }}
              >
          <Form  className = {css.formik}>
            <label>Search movie</label>
              <Field
              className={css.input}
              type="text"
              autoComplete="off"
              autoFocus
              name = 'topic'
              value = {value}
              onChange = {onChange}
              />
              <AddBtn context={'Search'} type={"submit"}/>
          </Form>
        </Formik>   

    </div>
  )
}
