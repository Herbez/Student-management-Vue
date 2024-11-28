<template>
    <div class="assign-container">
      <h2>Assign Marks</h2>
      <div v-if="students.length === 0">
        <p>No students available. Please add students first.</p>
      </div>
      <div v-else>
        <div>
          <label for="student">Select Student:</label>
          <select v-model="selectedStudent">
            <option v-for="(student, index) in students" :key="index" :value="student">
              {{ student.name }}
            </option>
          </select>
        </div>
        <div v-if="selectedStudent">
          <label for="math">Math:</label>
          <input type="number" v-model="mathMarks" required />
  
          <label for="computer">Computer:</label>
          <input type="number" v-model="computerMarks" required />
  
          <button @click="assignMarks">Submit Marks</button>
        </div>
  
      </div>
      
    </div>
    <h3>Assigned Marks Table</h3>
    <table v-if="results.length > 0" class="centered-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Math</th>
              <th>Computer</th>
              <th>Total</th>
              <th>Average</th>
              <th>Rank</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(result, index) in sortedResults" :key="index">
              <td>{{ result.name }}</td>
              <td>{{ result.math }}</td>
              <td>{{ result.computer }}</td>
              <td>{{ result.total }}</td>
              <td>{{ result.average }}</td>
              <td>{{ index + 1 }}</td>
              <td><button @click="editMarks(index)">Edit</button></td>
            </tr>
          </tbody>
    </table>
  </template>
  
  <script>
  export default {
    data() {
      return {
        students: [],
        selectedStudent: null,
        mathMarks: 0,
        computerMarks: 0,
        results: [],
      };
    },
    created() {
      // Parse students from query parameters
      const studentsQuery = this.$route.query.students;
      this.students = studentsQuery ? JSON.parse(studentsQuery) : [];
      if (this.students.length === 0) {
        alert('No students available. Please go back and add students.');
      }
    },
    computed: {
      sortedResults() {
        return [...this.results].sort((a, b) => b.average - a.average);
      },
    },
    methods: {
  assignMarks() {
    const total = this.mathMarks + this.computerMarks;
    const average = total / 2;

    // Check if we are editing an existing record or adding a new one
    if (this.editingIndex !== undefined && this.editingIndex !== null) {
      // Update the existing record at the editingIndex
      this.results[this.editingIndex] = {
        name: this.selectedStudent.name,
        math: this.mathMarks,
        computer: this.computerMarks,
        total,
        average,
      };
    } else {
      // Add a new record if editingIndex is null
      this.results.push({
        name: this.selectedStudent.name,
        math: this.mathMarks,
        computer: this.computerMarks,
        total,
        average,
      });
    }

    // Reset form fields
    this.mathMarks = 0;
    this.computerMarks = 0;
    this.selectedStudent = null;
    this.editingIndex = null;  // Clear the editing index after updating or adding
  },

  editMarks(index) {
    // Fetch the result based on index from the results list (marks list)
    const resultToEdit = this.results[index];  
    // Set the selected student's name from the result
    this.selectedStudent = { name: resultToEdit.name };  
    // Pre-fill the math and computer marks from the result
    this.mathMarks = resultToEdit.math;  
    this.computerMarks = resultToEdit.computer;  
    // Mark the row as being edited
    this.editingIndex = index;  
  },
},


  };
  </script>

  
<style>
  .assign-container {
    max-width: 600px;
    margin: auto;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  select,
  input {
    width: 30%;
    margin: 0.5rem;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 3px;
  }
  
  button {
    padding: 0.5rem 1rem;
    background-color: #28a745;
    border: none;
    color: white;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #218838;
  }

  .centered-table {
  margin: 0 auto; /* Centers the table horizontally */
  border-collapse: collapse; /* Ensures table borders collapse into one */
  width: 60%; /* Adjust table width (optional) */
  text-align: center; /* Centers text within table cells */
  margin-top: 40px;
}

.centered-table th, .centered-table td {
  padding: 10px; /* Adds spacing inside the cells */
  border: 1px solid #ccc; /* Adds a border to the table cells */
}

.centered-table th {
  background-color: #f4f4f4; /* Background color for header cells */
}

</style>
  