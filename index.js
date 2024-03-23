const express = require('express');
const app = express();

const cors = require('cors'); 

app.use(cors());
app.use(express.json()); 
require('./data/db')

app.get('/', (req, res) => {
  res.send('Hello')
});

const {Student} = require("./Models/StudentModel");
const {Teacher} = require("./Models/TeacherModel");

app.use(express.json());

app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://school-management-app-delta.vercel.app','http://localhost:3000' );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


app.get('/', (req, res) => {
  res.send('Hello!');
});

//post student data
app.post('/students', async (req, res) => {
  const inputData = req.body;

  if (!inputData.name || !inputData.age || !inputData.class || !inputData.marks || !inputData.attendance || !inputData.gender) {
    return res.status(400).json({ error: 'Name, age, class, marks, attendance, and gender are required.' });
  }

  try {
    const newStudent = new Student(inputData);
    const savedStudent = await newStudent.save();

    res.json({ success: true, data: savedStudent });
  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).json({ error: 'Error adding student' });
  }
})

//update student data
app.put('/students/:id', async (req, res) => {
  const studentId = req.params.id;
  const inputData = req.body;

  try {
    console.log(inputData)
    const updatedStudent = await Student.findByIdAndUpdate(studentId, inputData, { new: true });

    if (!updatedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.json({ success: true, data: updatedStudent });
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({ error: 'Error updating student' });
  }
})

//delete student data
app.delete('/students/:id', async (req, res) => {
  const studentId = req.params.id;

  try {
    const deletedStudent = await Student.findByIdAndDelete(studentId);

    if (!deletedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.json({ success: true, data: deletedStudent });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ error: 'Error deleting student' });
  }
});


//get all students data
app.get('/students', async (req, res) => {
  try {
    const students = await Student.find({});
    res.json({ success: true, data: students });
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'Error fetching students' });
  }
})

//get student data by id
app.get('/students/:id', async (req, res) => {
  const studentId = req.params.id;

  try {
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    return res.json({ success: true, data: student });
  } catch (error) {
    console.error('Error fetching student by ID:', error);
    res.status(500).json({ error: 'Error fetching student by ID' });
  }
});


// POST teacher data
app.post('/teachers', async (req, res) => {
  const inputData = req.body;

  if (!inputData.name || !inputData.phone || !inputData.subject) {
    return res.status(400).json({ error: 'Name, phone, and subject are required.' });
  }

  try {
    const newTeacher = new Teacher(inputData);
    const savedTeacher = await newTeacher.save();

    res.json({ success: true, data: savedTeacher });
  } catch (error) {
    console.error('Error adding teacher:', error);
    res.status(500).json({ error: 'Error adding teacher' });
  }
});

// UPDATE teacher data
app.put('/teachers/:id', async (req, res) => {
  const teacherId = req.params.id;
  const inputData = req.body;

  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(teacherId, inputData, { new: true });

    if (!updatedTeacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }

    res.json({ success: true, data: updatedTeacher });
  } catch (error) {
    console.error('Error updating teacher:', error);
    res.status(500).json({ error: 'Error updating teacher' });
  }
});

// DELETE teacher data
app.delete('/teachers/:id', async (req, res) => {
  const teacherId = req.params.id;

  try {
    const deletedTeacher = await Teacher.findByIdAndDelete(teacherId);

    if (!deletedTeacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }

    res.json({ success: true, data: deletedTeacher });
  } catch (error) {
    console.error('Error deleting teacher:', error);
    res.status(500).json({ error: 'Error deleting teacher' });
  }
});


// GET all teachers data
app.get('/teachers', async (req, res) => {
  try {
    const teachers = await Teacher.find({});
    res.json({ success: true, data: teachers });
  } catch (error) {
    console.error('Error fetching teachers:', error);
    res.status(500).json({ error: 'Error fetching teachers' });
  }
});

// GET teacher data by ID
app.get('/teachers/:id', async (req, res) => {
  const teacherId = req.params.id;

  try {
    const teacher = await Teacher.findById(teacherId);

    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }

    res.json({ success: true, data: teacher });
  } catch (error) {
    console.error('Error fetching teacher by ID:', error);
    res.status(500).json({ error: 'Error fetching teacher by ID' });
  }
});



// async function seedDatabase() {
//   try {
//     for (const studentData of studentsData) {
//       const newStudent = new Student({
//         name: studentData.name,
//         age: studentData.age,
//         class: studentData.class,
//         marks: studentData.marks,
//         attendance: studentData.attendance,
//         gender: studentData.gender
//       });

//       await newStudent.save();
//       console.log(`Student "${newStudent.name}" seeded.`);
//     }
//     console.log('Database seeding complete.');
//   } catch (error) {
//     console.error('Error seeding database:', error);
//   } finally {
//     mongoose.disconnect();
//   }
// }


// Call the seedDatabase function to start seeding
// seedDatabase();






const PORT = process.env.PORT || 9002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
