function createDepartmentList() {

    fetch('./data.json')
        .then((response) => response.json())
        .then((result) => {

            const departments = [];
            result.forEach((user) => {
                if (!departments.includes(user.department)) {
                    departments.push(user.department);
                }

            });

            const element_department_list = document.getElementById('department_list');

            departments
                .sort((a, b) => a.localeCompare(b))
                .forEach((department) => {
                    const element_department_li = document.createElement('li');
                    element_department_li.innerText = department;
                    element_department_li.setAttribute('class', 'list-group-item');
                    element_department_li.setAttribute('data-department', department);
                    element_department_li.addEventListener('click', (event) => {
                        const active_item = document.getElementById('department_list_active');
                        if (active_item) {
                            active_item.removeAttribute('id');
                            active_item.setAttribute('class', 'list-group-item');
                        }
                        element_department_li.setAttribute('id', 'department_list_active');
                        element_department_li.setAttribute('class', 'list-group-item active');
                        getDepartmentUsers(
                            event.target.dataset.department
                        );
                    });
                    element_department_list.appendChild(element_department_li);
                });

        });

}

createDepartmentList();
salaryFilter()
function getDepartmentUsers(department) {

    let element_salary_checkbox = document.getElementById('SalaryCheck');
    if (element_salary_checkbox.checked) {

        let department_user_list = document.getElementById('department_user_list');
        department_user_list.className = 'col d-none';
        let user_list_above_9000 = document.getElementById('user_list_above_9000');
        user_list_above_9000.className = 'col';
        let user_list_under_9000 = document.getElementById('user_list_under_9000');
        user_list_under_9000.className = 'col';
    }
    else {

        let department_user_list = document.getElementById('department_user_list');
        department_user_list.className = 'col';
        let user_list_above_9000 = document.getElementById('user_list_above_9000');
        user_list_above_9000.className = 'col d-none';
        let user_list_under_9000 = document.getElementById('user_list_under_9000');
        user_list_under_9000.className = 'col d-none';
    }


    fetch('./data.json')
        .then((response) => response.json())
        .then((result) => {


            const element_user_list = document.getElementById('table_department_user_list');
            element_user_list.innerHTML = null;

            const element_city_selector = document.getElementById('city_selector');

            console.log(element_city_selector.value);

            result
                .filter((user) => user.department === department)
                .filter((user) => user.city.toLocaleLowerCase().includes(element_city_selector.value.toLocaleLowerCase()))
                .map((user) => {
                    if (user.salary > 9000) {
                        return {
                            ...user,
                            "danger": true
                        }
                    } else {
                        return {
                            ...user,
                            "danger": false
                        }
                    }
                })
                .sort((a, b) => a.name.localeCompare(b.name))
                .forEach((user) => {

                    const element_tr = document.createElement('tr');
                    if (user.danger) {
                        element_tr.className = 'table-danger';
                    } else {
                        element_tr.className = 'table-success';
                    }

                    const element_name = document.createElement('td');
                    element_name.innerText = user.name;
                    element_tr.appendChild(element_name);

                    const element_surname = document.createElement('td');
                    element_surname.innerText = user.surname;
                    element_tr.appendChild(element_surname);

                    const element_city = document.createElement('td');
                    element_city.innerText = user.city;
                    element_tr.appendChild(element_city);

                    const element_department = document.createElement('td');
                    element_department.innerText = user.department;
                    element_tr.appendChild(element_department);

                    const element_detail = document.createElement('td');
                    const element_detail_button= document.createElement('button');
                    element_detail_button.setAttribute('class', 'btn btn btn-light');
                    element_detail_button.setAttribute('data-bs-toggle', 'modal');
                    element_detail_button.setAttribute('data-bs-target', '#modal_user_detail');
                    element_detail_button.setAttribute('data-phonenumber', user.phone_number);
                    element_detail_button.setAttribute('data-mail', user.mail);
                    element_detail_button.setAttribute('data-birthdate', user.birthdate);
                    element_detail_button.setAttribute('data-salary', user.salary);
                    element_detail_button.innerText = 'Details';
                    element_detail_button.addEventListener('click', (event) => {
                        document.getElementById('modal_user_phone_label').innerText =
                            '+90 ' + event.target.dataset.phonenumber;
                        document.getElementById('modal_user_mail_label').innerText =
                            event.target.dataset.mail;
                        document.getElementById('modal_user_birthdate_label').innerText =
                            event.target.dataset.birthdate;
                        let a = document.getElementById('modal_user_salary_label');
                        let b = document.getElementById('modal_user_salary_label2');
                        a.innerText = event.target.dataset.salary + ' TL';
                        if (user.danger) {
                            a.className = 'table-danger';
                            b.className = 'table-danger';
                        } else {
                            a.className = 'table-success';
                            b.className = 'table-success';
                        }
                    });
                    element_detail.appendChild(element_detail_button);

                    element_tr.appendChild(element_detail);
                    element_user_list.appendChild(element_tr);
                });

        });

}

const element_all_departments_li = document.getElementById('all_departmens');
element_all_departments_li.addEventListener("click", () => {

    const active_item = document.getElementById('department_list_active');
    if (active_item) {
        active_item.removeAttribute('id');
        active_item.setAttribute('class', 'list-group-item');
    }
    element_all_departments_li.setAttribute('id', 'department_list_active');
    element_all_departments_li.setAttribute('class', 'list-group-item active');

    getAllUsers();
});

function getAllUsers(){
    fetch('./data.json')
        .then((response) => response.json())
        .then((result) => {

            let department_user_list = document.getElementById('department_user_list');
            department_user_list.className = 'col';
            let user_list_above_9000 = document.getElementById('user_list_above_9000');
            user_list_above_9000.className = 'col d-none';
            let user_list_under_9000 = document.getElementById('user_list_under_9000');
            user_list_under_9000.className = 'col d-none';

            const element_user_list = document.getElementById('table_department_user_list');
            element_user_list.innerHTML = null;

            const element_city_selector = document.getElementById('city_selector');

            console.log(element_city_selector.value);

            result
                .filter((user) => user.city.toLocaleLowerCase().includes(element_city_selector.value.toLocaleLowerCase()))
                .map((user) => {
                    if (user.salary > 9000) {
                        return {
                            ...user,
                            "danger": true
                        }
                    } else {
                        return {
                            ...user,
                            "danger": false
                        }
                    }
                })
                .sort((a, b) => a.name.localeCompare(b.name))
                .forEach((user) => {

                    const element_tr = document.createElement('tr');
                    if (user.danger) {
                        element_tr.className = 'table-danger';
                    } else {
                        element_tr.className = 'table-success';
                    }

                    const element_name = document.createElement('td');
                    element_name.innerText = user.name;
                    element_tr.appendChild(element_name);

                    const element_surname = document.createElement('td');
                    element_surname.innerText = user.surname;
                    element_tr.appendChild(element_surname);

                    const element_city = document.createElement('td');
                    element_city.innerText = user.city;
                    element_tr.appendChild(element_city);

                    const element_department = document.createElement('td');
                    element_department.innerText = user.department;
                    element_tr.appendChild(element_department);

                    const element_detail = document.createElement('td');
                    const element_detail_button= document.createElement('button');
                    element_detail_button.setAttribute('class', 'btn btn btn-light');
                    element_detail_button.setAttribute('data-bs-toggle', 'modal');
                    element_detail_button.setAttribute('data-bs-target', '#modal_user_detail');
                    element_detail_button.setAttribute('data-phonenumber', user.phone_number);
                    element_detail_button.setAttribute('data-mail', user.mail);
                    element_detail_button.setAttribute('data-birthdate', user.birthdate);
                    element_detail_button.setAttribute('data-salary', user.salary);
                    element_detail_button.innerText = 'Details';
                    element_detail_button.addEventListener('click', (event) => {
                        document.getElementById('modal_user_phone_label').innerText =
                            '+90 ' + event.target.dataset.phonenumber;
                        document.getElementById('modal_user_mail_label').innerText =
                            event.target.dataset.mail;
                        document.getElementById('modal_user_birthdate_label').innerText =
                            event.target.dataset.birthdate;
                        let a = document.getElementById('modal_user_salary_label');
                        let b = document.getElementById('modal_user_salary_label2');
                        a.innerText = event.target.dataset.salary + ' TL';
                        if (user.danger) {
                            a.className = 'table-danger';
                            b.className = 'table-danger';
                        } else {
                            a.className = 'table-success';
                            b.className = 'table-success';
                        }
                    });
                    element_detail.appendChild(element_detail_button);

                    element_tr.appendChild(element_detail);
                    element_user_list.appendChild(element_tr);
                });

        });


}

function cityChange() {
    const active_item = document.getElementById('department_list_active');
    if (active_item) {
        if (active_item.dataset.department) {
            getDepartmentUsers(
                active_item.dataset.department
            );
        } else {
            getAllUsers();
        }
    }
}

function selectCity() {
    fetch('./data.json')
        .then((response) => response.json())
        .then((result) => {

            let cities = [];
            result.forEach((user) => {
                if (!cities.includes(user.city)) {
                    cities.push(user.city);
                }
            });
            cities = cities.sort((a, b) => a.localeCompare(b))
            console.log(cities);

            //<option value="1">One</option>

            cities.forEach((city) => {

                const cityOption = document.createElement('option');
                cityOption.value = city;
                cityOption.innerText = city;
                const city_selector = document.getElementById('city_selector');
                city_selector.appendChild(cityOption);

            })
        });
}
selectCity();

function salaryFilter() {

    let element_salary_checkbox = document.getElementById('SalaryCheck');
    element_salary_checkbox.addEventListener("click", () => {
        if (element_salary_checkbox.checked) {

            let department_user_list = document.getElementById('department_user_list');
            department_user_list.className = 'col d-none';
            let user_list_above_9000 = document.getElementById('user_list_above_9000');
            user_list_above_9000.className = 'col';
            let user_list_under_9000 = document.getElementById('user_list_under_9000');
            user_list_under_9000.className = 'col';

            salaryFilterFirstTable()
            salaryFilterSecondTable()

        }

        else {

            let department_user_list = document.getElementById('department_user_list');
            department_user_list.className = 'col';
            let user_list_above_9000 = document.getElementById('user_list_above_9000');
            user_list_above_9000.className = 'col d-none';
            let user_list_under_9000 = document.getElementById('user_list_under_9000');
            user_list_under_9000.className = 'col d-none';


        }
    });

}
function salaryFilterFirstTable() {

    const element_city_selector = document.getElementById('city_selector');
    const element_department_active = document.getElementById('department_list_active');

    let department = null;
    if (element_department_active) {
        department = element_department_active.dataset.department ? element_department_active.dataset.department : null;
    }

    const table_user_list_above_9000 = document.getElementById('table_user_list_above_9000');
    table_user_list_above_9000.innerHTML = null;

    fetch('./data.json')
        .then((response) => response.json())
        .then((result) => {
            result
                .sort((a, b) => a.name.localeCompare(b.name))
                .filter((user) => department ? user.department === department : true)
                .filter((user) => user.city.toLocaleLowerCase().includes(element_city_selector.value.toLocaleLowerCase()))
                .filter((user) => user.salary > 9000)
                .forEach((user) => {

                    const element_tr = document.createElement('tr');
                    element_tr.className = 'table-danger';

                    const element_name = document.createElement('td');
                    element_name.innerText = user.name;
                    element_tr.appendChild(element_name);

                    const element_surname = document.createElement('td');
                    element_surname.innerText = user.surname;
                    element_tr.appendChild(element_surname);

                    const element_city = document.createElement('td');
                    element_city.innerText = user.city;
                    element_tr.appendChild(element_city);

                    const element_department = document.createElement('td');
                    element_department.innerText = user.department;
                    element_tr.appendChild(element_department);

                    const element_detail = document.createElement('td');
                    const element_detail_button= document.createElement('button');
                    element_detail_button.setAttribute('class', 'btn btn btn-light');
                    element_detail_button.setAttribute('data-bs-toggle', 'modal');
                    element_detail_button.setAttribute('data-bs-target', '#modal_user_detail');
                    element_detail_button.setAttribute('data-phonenumber', user.phone_number);
                    element_detail_button.setAttribute('data-mail', user.mail);
                    element_detail_button.setAttribute('data-birthdate', user.birthdate);
                    element_detail_button.setAttribute('data-salary', user.salary);
                    element_detail_button.innerText = 'Details';
                    element_detail_button.addEventListener('click', (event) => {
                        document.getElementById('modal_user_phone_label').innerText =
                            '+90 ' + event.target.dataset.phonenumber;
                        document.getElementById('modal_user_mail_label').innerText =
                            event.target.dataset.mail;
                        document.getElementById('modal_user_birthdate_label').innerText =
                            event.target.dataset.birthdate;
                        let a = document.getElementById('modal_user_salary_label');
                        let b = document.getElementById('modal_user_salary_label2');
                        a.innerText = event.target.dataset.salary + ' TL';
                        a.className = 'table-danger';
                        b.className = 'table-danger';

                    });
                    element_detail.appendChild(element_detail_button);

                    element_tr.appendChild(element_detail);

                    table_user_list_above_9000.appendChild(element_tr);

                });
            console.log(result)

        })
}
function salaryFilterSecondTable() {

    const element_city_selector = document.getElementById('city_selector');
    const element_department_active = document.getElementById('department_list_active');

    let department = null;
    if (element_department_active) {
        department = element_department_active.dataset.department ? element_department_active.dataset.department : null;
    }

    const table_user_list_under_9000 = document.getElementById('table_user_list_under_9000');

    table_user_list_under_9000.innerHTML = null;

    fetch('./data.json')
        .then((response) => response.json())
        .then((result) => {
            result
                .sort((a, b) => a.name.localeCompare(b.name))
                .filter((user) => department ? user.department === department : true)
                .filter((user) => user.city.toLocaleLowerCase().includes(element_city_selector.value.toLocaleLowerCase()))
                .filter((user) => user.salary <= 9000)
                .forEach((user) => {

                    const element_tr = document.createElement('tr');
                    element_tr.className = 'table-success';

                    const element_name = document.createElement('td');
                    element_name.innerText = user.name;
                    element_tr.appendChild(element_name);

                    const element_surname = document.createElement('td');
                    element_surname.innerText = user.surname;
                    element_tr.appendChild(element_surname);

                    const element_city = document.createElement('td');
                    element_city.innerText = user.city;
                    element_tr.appendChild(element_city);

                    const element_department = document.createElement('td');
                    element_department.innerText = user.department;
                    element_tr.appendChild(element_department);

                    const element_detail = document.createElement('td');
                    const element_detail_button= document.createElement('button');
                    element_detail_button.setAttribute('class', 'btn btn btn-light');
                    element_detail_button.setAttribute('data-bs-toggle', 'modal');
                    element_detail_button.setAttribute('data-bs-target', '#modal_user_detail');
                    element_detail_button.setAttribute('data-phonenumber', user.phone_number);
                    element_detail_button.setAttribute('data-mail', user.mail);
                    element_detail_button.setAttribute('data-birthdate', user.birthdate);
                    element_detail_button.setAttribute('data-salary', user.salary);
                    element_detail_button.innerText = 'Details';
                    element_detail_button.addEventListener('click', (event) => {
                        document.getElementById('modal_user_phone_label').innerText =
                            '+90 ' + event.target.dataset.phonenumber;
                        document.getElementById('modal_user_mail_label').innerText =
                            event.target.dataset.mail;
                        document.getElementById('modal_user_birthdate_label').innerText =
                            event.target.dataset.birthdate;
                        let a = document.getElementById('modal_user_salary_label');
                        let b = document.getElementById('modal_user_salary_label2');
                        a.innerText = event.target.dataset.salary + ' TL';
                        a.className = 'table-success';
                        b.className = 'table-success';

                    });
                    element_detail.appendChild(element_detail_button);

                    element_tr.appendChild(element_detail);

                    table_user_list_under_9000.appendChild(element_tr);

                });
            console.log(result)

        })
}
