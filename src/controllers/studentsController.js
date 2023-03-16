function index(req, res) {
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM estudiantes', (err, students) => {
      if(err) {
        res.json(err);
      }
      res.render('students/index', { students });
    });
  });
}

function add(req, res) {

  res.render('students/add');
}

function store(req, res) {
  const data = req.body;
  const nom = data.nombre.substr(0,3).toUpperCase()
  const ape = data.apellido.substr(0,3).toUpperCase()
  let arrayCode = [], codeGenerado, arrayStr
  for (let index = 1; index < 6; index++) {
    arrayCode.push(Math.floor(Math.random() * (9 - 0) + 0))
  }
  arrayStr  = arrayCode.toString()
  codeGenerado = arrayStr.replace(/,/g,'')
  data.matricula = `${nom}${ape}-${codeGenerado}`

  req.getConnection((err, conn) => {
    conn.query('INSERT INTO estudiantes SET ?', [data], (err, rows) => {
      res.redirect('/students'); 
    });
  });
}

function destroy(req, res) {
  const id = req.body.id;

  req.getConnection((err, conn) => {
    conn.query('DELETE FROM estudiantes WHERE id = ?', [id], (err, rows) => {
      res.redirect('/students');
    });
  })
}

function edit(req, res) {
  const id = req.params.id;

  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM estudiantes WHERE id = ?', [id], (err, students) => {
      if(err) {
        res.json(err);
      }
      res.render('students/edit', { students });
    });
  });
}

function update(req, res) {
  const id = req.params.id;
  const data = req.body;

  req.getConnection((err, conn) => {
    conn.query('UPDATE estudiantes SET ? WHERE id = ?', [data, id], (err, rows) => {
      res.redirect('/students');
    });
  });
}

function studentsSearch(req, res) {
  let grade = req.body.filterGrade;
  let area = req.body.filterArea;

  req.getConnection((err, conn) => {
    conn.query(
      `select * from estudiantes where area='${area}' and grado='${grade}'`,
      (err, students) => {
        if (err) {
          res.json(err);
        }
        
         res.render("students/index", { students });
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
  studentsSearch: studentsSearch,
}