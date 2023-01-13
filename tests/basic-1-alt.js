const assert = require("assert");
const anchor = require("@coral-xyz/anchor");
const { SystemProgram } = anchor.web3;

describe("alt way", () => {
    const provider = anchor.AnchorProvider.local();

    anchor.setProvider(provider);
    let _myAccount = null; // increase scope

    it("initialize the contract", async () => {
        const program = anchor.workspace.Basic1;
        const myAccount = anchor.web3.Keypair.generate();
        await program.rpc.initialize({
            accounts: {
                myAccount: myAccount.publicKey,
                user: provider.wallet.publicKey,
                systemProgram: SystemProgram.programId,
            },
            signers: [myAccount],
        });
        const account = await program.account.myAccount.fetch(myAccount.publicKey);
        assert.ok(account.data.eq(new anchor.BN(0)));
        _myAccount = myAccount;
    });

    it("update it val", async () => {
        const myAccount = _myAccount;
        const program = anchor.workspace.Basic1;
        await program.rpc.update(new anchor.BN(10), {
            accounts: {
                myAccount: myAccount.publicKey,
            },
        });
        const account = await program.account.myAccount.fetch(myAccount.publicKey);
        assert.ok(account.data.eq(new anchor.BN(10)));
    });

    it("increment by 1", async () => {
        const myAccount = _myAccount;
        const program = anchor.workspace.Basic1;
        await program.rpc.increment({
            accounts: {
                myAccount: myAccount.publicKey,
            }
        });
        const account = await program.account.myAccount.fetch(myAccount.publicKey);
        assert.ok(account.data.eq(new anchor.BN(11)));
    });

    it("decreases by 1", async () => {
        const myAccount = _myAccount;
        const program = anchor.workspace.Basic1;
        await program.rpc.decrement({
            accounts: {
                myAccount: myAccount.publicKey,
            }
        });
        const account = await program.account.myAccount.fetch(myAccount.publicKey);
        assert.ok(account.data.eq(new anchor.BN(10)));
    });
});
