<template>
  <div class="form-container">
    <h2>Student Form</h2>
    <form @submit.prevent="submitForm">
      <div>
        <label for="name">Name: </label>
        <input type="text" id="name" v-model="studentName" required />
      </div>
      <div>
        <label for="class">Class: </label>
        <input type="text" id="class" v-model="studentClass" required />
      </div>
      <button type="submit">{{ isEditing ? 'Update' : 'Submit' }}</button>
    </form>
  </div>

  <h3>Student List</h3>
  <button class="assign" @click="goToAssignPage">Assign Marks</button>

  <div v-if="students.length > 0" class="students-list">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Class</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(student, index) in students" :key="index">
          <td>{{ student.name }}</td>
          <td>{{ student.class }}</td>
          <td>
            <button class="edit" @click="editStudent(index)">Edit</button>
            <button @click="deleteStudent(index)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      studentName: '',
      studentClass: '',
      students: [],
      isEditing: false,
      editIndex: null,
    };
  },
  methods: {
    submitForm() {
      if (this.isEditing) {
        this.students[this.editIndex] = {
          name: this.studentName,
          class: this.studentClass,
        };
        this.isEditing = false;
        this.editIndex = null;
        alert('Student updated successfully!');
      } else {
        this.students.push({
          name: this.studentName,
          class: this.studentClass,
        });
      }
      this.studentName = '';
      this.studentClass = '';
    },
    editStudent(index) {
      this.studentName = this.students[index].name;
      this.studentClass = this.students[index].class;
      this.isEditing = true;
      this.editIndex = index;
    },
    deleteStudent(index) {
      this.students.splice(index, 1);
      alert('Student deleted successfully!');
    },
    goToAssignPage() {
      if (this.students.length === 0) {
        alert('No students available to assign marks!');
        return;
      }
      // Pass student data as a query parameter
      this.$router.push({ name: 'AssignMarks', query: { students: JSON.stringify(this.students) } });
    },
  },
};
</script>


<style>
/* General styling */
table button.assign {
  background-color: #28a745; /* Green for assign button */
  color: white;
}

table button.assign:hover {
  background-color: #218838;
}

.form-container {
  max-width: 400px;
  margin: auto;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

form div {
  margin-bottom: 1rem;
}

label {
  display: inline-block;
  margin-right: 10px;
  font-weight: bold;
}

input {
  width: 70%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 3px;
}

button {
  padding: 0.5rem 1rem;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

/* Table styling */
.students-list {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
}

table {
  width: 40%;
  border-collapse: collapse;
}

th,
td {
  text-align: left;
  padding: 0.5rem;
  border: 1px solid #ccc;
}

th {
  background-color: #f4f4f4;
}

/* Delete button styling */
table button {
  background-color: #dc3545; /* Red for delete button */
}

table button:hover {
  background-color: #c82333;
}

table button.edit {
  background-color: #007bff; /* Blue color */
  color: white;
  margin-right: 10px;
}

table button.edit:hover {
  background-color: #0056b3; /* Darker blue on hover */
}
</style>
