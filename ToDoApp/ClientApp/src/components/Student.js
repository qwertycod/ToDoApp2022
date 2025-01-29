import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { IHttpResponse, useAuthenticatedFetch, useAuthenticatedPost } from './helper/ApiHelper.js'
import { ShimmeredDetailsList, DetailsListLayoutMode, SelectionMode } from '@fluentui/react';
import { Spinner } from '@fluentui/react';

   const Student: React.FunctionComponent = () => {
       var studentUrl = `api/students`

    const [students, isstudentsApiInProgress, isstudentsApiError, dostudentsFetch] = useAuthenticatedFetch(studentUrl);
    const [saveStudentResult, issaveStudentApiInProgress, issaveStudentApiError, dosaveStudentPost] = useAuthenticatedPost();

    let apiRootUrl = "https://localhost:50001/";

    useEffect(() => {
        let url = `api/student`
        dostudentsFetch(url);
    }, [])

       const studentColumns = [
           {
               key: 'id',
               name: 'id',
               fieldName: 'id',
               minWidth: 50,
               maxWidth: 200,
               isResizable: true
           },
           {
               key: 'name',
               name: 'name',
               fieldName: 'name',
               minWidth: 50,
               maxWidth: 100,
               isResizable: true

           },
           {
               key: 'year',
               name: 'year',
               fieldName: 'year',
               minWidth: 50,
               maxWidth: 100,
               isResizable: true
           },
           {
               key: 'userid',
               name: 'userid',
               fieldName: 'userid',
               minWidth: 50,
               maxWidth: 100,
               isResizable: true

           },
           {
               key: 'courseid',
               name: 'courseid',
               fieldName: 'courseid',
               minWidth: 50,
               maxWidth: 100,
               isResizable: true
           },
       ]
       const [studentToShow, setStudentToShow] = useState([]);
       const [student, setStudent] = useState({
           name: "",
           userId: "",
           year: 0,
       });

       const handleInputChange = (e) => {
           const { name, value } = e.target;
           setStudent({ ...student, [name]: value });
       };

       const handleSubmit = () => {
           console.log(JSON.stringify(student));
           dosaveStudentPost('api/student', student); 
       };

       useEffect(() => {
           if (students && students?.data) {
               setStudentToShow(students?.data);
           }
       }, [students])

       // Read Created Student
       useEffect(() => {
           if (issaveStudentApiError) {
               alert(saveStudentResult.error?.message);
           } else if (saveStudentResult?.data && !issaveStudentApiInProgress) {
               const data = saveStudentResult?.data?.student?.result;
               if (data) {
                   let studentToShowUpdated = [...studentToShow, data];
                   setStudentToShow(studentToShowUpdated);
               }
           }
       }, [saveStudentResult, issaveStudentApiError]);

    return (
        <div>
            {isstudentsApiInProgress ? <Spinner label="Loading students results.." ariaLive="assertive" labelPosition="right" /> : null}

            {!students?.data && !isstudentsApiInProgress &&
                <div style={{ display: "flex", justifyContent: "center" }}>
                    No results available. Please try changing filter.
                </div>}

            {students && students?.data &&
                <ShimmeredDetailsList
                             items={studentToShow}
                            columns={studentColumns}
                            layoutMode={DetailsListLayoutMode.fixedColumns}
                            selectionMode={SelectionMode.none}
                enableShimmer={!studentToShow}
                            shimmerLines={10}
                        />
            }
            <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
                <h2>Student Form</h2>
                <div style={{ marginBottom: "10px" }}>
                    <label>Name: </label>
                    <input
                        type="text"
                        name="Name"
                        value={student.Name}
                        onChange={handleInputChange}
                        placeholder="Enter Name"
                    />
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label>UserId: </label>
                    <input
                        type="text"
                        name="UserId"
                        value={student.UserId}
                        onChange={handleInputChange}
                        placeholder="Enter UserId"
                    />
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label>Year: </label>
                    <input
                        type="text"
                        name="Year"
                        value={student.Year}
                        onChange={handleInputChange}
                        placeholder="Enter Year"
                    />
                </div>
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    )
}

export default Student;

const data = [{
    id: '1', name: "a",
    userId: "a", year: "0000", courseid: 'courseid'
}, {
    id: '2', Name: "b",
    UserId: "b",
    Year: "0001", courseid: 'courseid'
}]