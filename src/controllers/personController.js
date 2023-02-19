function index(req, res) {
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM caracteristicas', (err, persons) => {
      if(err) {
        res.json(err);
      }
      res.render('persons/index', { persons });
    });
  });
}

function add(req, res) {

  res.render('persons/add');
}

function store(req, res) {
  const data = req.body;

  req.getConnection((err, conn) => {
    conn.query('INSERT INTO caracteristicas SET ?', [data], (err, rows) => {
      res.redirect('/persons');
    });
  });
}

function destroy(req, res) {
  const id = req.body.id;

  req.getConnection((err, conn) => {
    conn.query('DELETE FROM caracteristicas WHERE id = ?', [id], (err, rows) => {
      res.redirect('/persons');
    });
  })
}

function edit(req, res) {
  const id = req.params.id;

  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM caracteristicas WHERE id = ?', [id], (err, persons) => {
      if(err) {
        res.json(err);
      }
      res.render('persons/edit', { persons });
    });
  });
}

function update(req, res) {
  const id = req.params.id;
  const data = req.body;

  req.getConnection((err, conn) => {
    conn.query('UPDATE caracteristicas SET ? WHERE id = ?', [data, id], (err, rows) => {
      res.redirect('/persons');
    });
  });
}


module.exports = {
  index: index,
  add: add,
  store: store,
  destroy: destroy,
  edit: edit,
  update: update,
}