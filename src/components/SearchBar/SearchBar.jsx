import { Formik, Form, Field } from 'formik';
import css from './SearchBar.module.css';
import AddBtn from '../Button/Button';



export default function SearchBar({onSearch}) {

  return (
    <div>
           <Formik
             initialValues={{
             topic:'',
             }}
            onSubmit={(values, actions)=>{
            onSearch(values.topic.trim());
            actions.resetForm();
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
              />
              <AddBtn context={'Search'} type={"submit"}/>
          </Form>
        </Formik>   
    </div>
  )
}