function getAllCompanyNames() {

    fetch('https://dummyjson.com/users')
        .then((response) => response.json())
        .then((users) => {
            const company_names = [];
            users.users.forEach((user) => {
                /*
                Aynı company bilgisini tekrarlamamak için, oluşturduğumuz "company_names" dizisinin
                içerisini "includes" ile kontrol ediyoruz. Eğer bu veri dizide yoksa ekleme işlemi
                yapıyoruz.
                */
                if (!company_names.includes(user.company.name)) {
                    company_names.push(user.company.name);
                }
            })
            // <li class="list-group-item" >
            company_names.sort((a,b) => a.localeCompare(b)); // A-Z sıralaması
            company_names.forEach((x, index) => {

                const company_ul = document.getElementById('company_ul');
                const company_li = document.createElement('li');
                company_li.className = 'list-group-item';
                /*
                Eleman üzerinden daha sonra erişmek adına bir parametre bırakalım.
                Eklenecek bu parametre daha önceden tanımlanmadığı için 'setAttribute' fonksiyonunu kullanıyoruz.
                JS üzerinde 'data-*' olarak tanımlanmış herhangi bir parametreye 'dataset' üzerinden erişebiliriz.
                'dataset.*' olarak erişim sağlanabilir.
                */
                company_li.setAttribute('data-company', x);
                company_li.innerText = x.toUpperCase();
                company_ul.appendChild(company_li);
                company_li.addEventListener('click', (event) => {
                    /*
                    'active' sınıfına ait geçmişte bir eleman olup olmadığını kontrol etmem gerekir.
                    Bu sebeple 'document' üzerinde 'active' sınıfına sahip tüm elemanları 'activated' dizisine atayalım.
                    Biliyoruz ki aynı anda sadece 1 eleman 'active' sınıfına sahip. O sebeple [0 (sıfır)] indis üzerindeki
                    elemanın 'className' bilgisini güncelliyoruz. Ta da... Artık 'active' sınıfına sahip hiçbir eleman kalmadı.
                    Ta kii biz atayana kadar.
                    */
                    const actived = document.getElementsByClassName('list-group-item active');
                    if (actived.length > 0) {
                        actived[0].className = 'list-group-item';
                    }
                    company_li.className = 'list-group-item active';
                    getCompanyUsersInfo(
                        event.target.dataset.company
                    );
                });

            });

        });
}
getAllCompanyNames()
function getCompanyUsersInfo(company_name) {
    fetch('https://dummyjson.com/users')
        .then((response) => response.json())
        .then((result) => {
            let users = result.users;
            users = users.filter((user) => user.company.name === company_name);
            console.log(users);
        });
}

