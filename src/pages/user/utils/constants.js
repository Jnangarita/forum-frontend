const userConstants = {
  COLUMNS: [
    { name: 'index', label: 'Nro', field: 'index', headerStyle: "font-weight: bold", },
    { align: "left", field: "question", label: "Pregunta", name: "question", sortable: true, headerStyle: "font-weight: bold", },
    { align: "center", field: "status", label: "Estado", name: "status", sortable: true, headerStyle: "font-weight: bold", },
    { align: "center", field: "creationDate", label: "Fecha de creación", name: "creationDate", sortable: true, headerStyle: "font-weight: bold", },
  ]
};

export { userConstants };