export const loginProcess = (server,body) => new Promise((resolve,reject) => {
    const {username,password} = body;

    let checker = verify(username,password);
    if(checker) {
        reject(checker);
    }
    let objJwt = {
        username,
        loginTime : new Date()
    };
    server.jwt.sign({ objJwt }, (error, encoded) => {
        if(error) {
            reject(error);
        }else {
            server.redis.set(username,JSON.stringify({ username, token: encoded }), "EX",server.conf.expireToken, (err,val) => {
                if(err) {
                    reject(err);
                }else {
                    resolve(encoded);
                }
            });
        }
    });
});

const verify = (un,pass) => {
    let msg = '';
    if(un == '' || un.length<3 || un.length >= 20) {
        msg += 'panjang karakter username antara 3 - 20\n';
    }
    if(pass == '') {
        msg += 'password tidak boleh kosong';
    }
    return msg;
};