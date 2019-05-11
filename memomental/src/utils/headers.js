const basicHeaders = {'Content-Type': 'application/json'
};

const tokenHeaders =
    {'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('token')
};
