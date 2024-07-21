const userConstants = {
  COLUMNS: [
    { name: 'index', label: 'Nro', field: 'index' },
    { align: "left", field: "question", label: "Pregunta", name: "question", sortable: true },
    { align: "center", field: "status", label: "Estado", name: "status", sortable: true },
    { align: "center", field: "creationDate", label: "Fecha de creación", name: "creationDate", sortable: true, },
  ]
};

export { userConstants };