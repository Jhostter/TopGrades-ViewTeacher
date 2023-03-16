function index(req, res) {
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM calificacion5to", (err, grades) => {
      if (err) {
        res.json(err);
      }
      res.render("grades/index", { grades });
    });
  });
}

function searchGrades(req, res) {
  let grade = req.body.filterGrade;
  let area = req.body.filterArea;

  req.getConnection((err, conn) => {
    conn.query(
      `select * from calificacion${grade} where area='${area}' and grado='${grade}'`,
      (err, grades) => {
        if (err) {
          res.json(err);
        }

        res.render("grades/index", { grades });
      }
    );
  });
}

function add(req, res) {
  res.render("grades/add");
}

function filterGrades(req, res) {
  let grade = req.body.filterGrade;
  let area = req.body.filterArea;

  req.getConnection((err, conn) => {
    conn.query(
      `select * from estudiantes where area='${area}' and grado='${grade}'`,
      (err, studentsF) => {
        if (err) {
          res.json(err);
        }
        const gr = (studentsF.grado = grade);
        const ar = (studentsF.area = area);
        res.render("grades/add", { studentsF, gr, ar });
      }
    );
  });
}

function store(req, res) {
  let data = req.body;
  const grade = data.grado;
  const area = data.area;
  const nombre = data.nombre_est;
  const arr = nombre.split(" ");
  const nom = arr[0];
  const ape = arr[1];
  let arrData;

  req.getConnection((err, conn) => {
    conn.query(
      `select matricula from estudiantes where nombre = '${nom}' and apellido = '${ape}' and grado = '${grade}' and area = '${area}'`,
      async function (err, rows) {
        if (err) {
          res.json(err);
        }
        data.matricula = rows[0].matricula;
        
        conn.query(
          `INSERT INTO calificacion${grade} SET ?`,
          [data],
          (err, rows) => {
            if (err) {
              res.json(err);
            }
            res.redirect("/viewGrades");
          }
        );
      }
    );
  });
}

function renderG(e, r) {
  if (err) {
    res.json(err);
  }
  res.redirect("/viewGrades");
}

function destroy(req, res) {
  const data = req.body;
  const id = data.id;
  const grade = data.grado;

  req.getConnection((err, conn) => {
    conn.query(
      `DELETE FROM calificacion${grade} WHERE id = ${id}`,
      (err, rows) => {
        res.redirect("/viewGrades");
      }
    );
  });
}

function edit(req, res) {
  const id = req.params.id;
  const arr = id.split("_");
  const grade = arr[1];
  const idS = arr[0];

  req.getConnection((err, conn) => {
    conn.query(
      `SELECT * FROM calificacion${grade} WHERE id = ?`,
      [idS],
      (err, grades) => {
        if (err) {
          res.json(err);
        }
        res.render("grades/edit", { grades });
      }
    );
  });
}

function update(req, res) {
  const id = req.params.id;
  const data = req.body;
  const arr = id.split("_");
  const grade = arr[1];
  const idS = arr[0];
  const asignatura = data.asignatura;
  const periodo = data.periodo;
  const calificacion = data.calificacion;

  req.getConnection((err, conn) => {
    conn.query(
      `UPDATE calificacion${grade} SET asignatura='${asignatura}', periodo='${periodo}', calificacion=${calificacion} WHERE id = ${idS}`,
      (err, rows) => {
        res.redirect("/viewGrades");
      }
    );
  });
}

module.exports = {
  index: index,
  add: add,
  store: store,
  destroy: destroy,
  edit: edit,
  update: update,
  searchGrades: searchGrades,
  filterGrades: filterGrades,
};
