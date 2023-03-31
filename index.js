import crypto from 'crypto'

class UserManager {
    #BD

    constructor() {       
        this.#BD = [];
    }

    getUsers = () => this.#BD

    insertUser = user => {
        user.salt = crypto.randomBytes(128).toString('base64')
        user.password = crypto.createHmac('sha256', user.salt).update(user.password).digest('hex')
        this.#BD.push(user)
    }

    validateUser = (username, password) => {
        const user = this.#BD.find(item => item.username === username)
        if (!user) {
            console.log('El usuario no existe.')
            return
        }

        const newHash = crypto.createHmac('sha256', user.salt).update(password).digest('hex')
        if (newHash == user.password) console.log('Ingresaste perrito')
        else console.log('aaaah, no te sabes la contra eeehh')
    }
}

const manager = new UserManager()
console.log(manager.getUsers())
manager.insertUser({
    name: 'Felipe',
    lastname: 'Mahia',
    username: 'PipeMahia',
    password: 'getthefuckout'
})
console.log(manager.getUsers())
manager.validateUser('PipeMahia', 'getthefuckout')