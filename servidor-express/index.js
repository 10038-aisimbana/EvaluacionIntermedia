const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const router = express.Router();

const estudiantes = [];
const evaluaciones = [];

const asignaciones = [];

router.post('/asignaciones', (req, res) => {

  const { estudianteId, evaluacionId } = req.body;

  if (!estudianteId || !evaluacionId) {
    res.status(400).json({ error: 'Datos de asignación no válidos' });
    return;
  }

  asignaciones.push({ estudianteId, evaluacionId });

  res.json(asignaciones);
});

router.post('/estudiantes', (req, res) => {
  try {
    const nuevoEstudiante = req.body;

    if (!nuevoEstudiante || !nuevoEstudiante.nombre) {
      throw new Error('Datos de estudiante no válidos');
    }

    estudiantes.push(nuevoEstudiante);

    res.json(estudiantes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/estudiantes', (req, res) => {
  res.json(estudiantes);
});

router.post('/evaluaciones', (req, res) => {

  const nuevaEvaluacion = req.body;

  if (!nuevaEvaluacion || !nuevaEvaluacion.titulo || !nuevaEvaluacion.pregunta || !nuevaEvaluacion.respuesta) {
    res.status(400).json({ error: 'Datos de evaluación no válidos' });
    return;
  }

  evaluaciones.push(nuevaEvaluacion);

  res.json(evaluaciones);
});

app.use('/api', router);

app.listen(port, () => {
  console.log(`Servidor Express escuchando en http://localhost:${port}`);
});
