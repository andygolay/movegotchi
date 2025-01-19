script {
    use std::string::utf8;

    fun create_gotchi(user: &signer) {
        let gotchi_name = utf8(b"gotchi");
        movegotchi_addr::main::create_movegotchi(user, gotchi_name, 1, 1, 1);
    }
}
