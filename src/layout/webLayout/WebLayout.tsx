import Header from "./Header/Header";
import { useDynamicForm } from "hooks/useDynamicForm";
import DynamicForm from "views/components/DynamicForm";

function WebLayout({ children }: any) {
  const forms = useDynamicForm();
  console.log(forms, "forms");
  return (
    <>
      <Header />
      {forms.length > 0 && forms[0]?.form?.fields && (
        <DynamicForm
          fields={forms[0].form.fields}
          id={forms[0].id}
          title={forms[0].title ? forms[0].title : "Form"}
        />
      )}
      {children}
    </>
  );
}

export default WebLayout;
