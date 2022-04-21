/* import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { Mysolanacalculator } from "../target/types/mysolanacalculator";

describe("mysolanacalculator", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Mysolanacalculator as Program<Mysolanacalculator>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
}); */

//import assert from 'assert';
//import anchor from '@project-serum/anchor';
//const {SystemProgram} = anchor.web3;
import * as anchor from '@project-serum/anchor';
//import { IdlTypes, Program } from '@project-serum/anchor';
import * as assert from 'assert';
//import { SolanaCalculator } from '../target/types/solana_calculator';

const { SystemProgram } = anchor.web3;

describe('mysolanacalculator', () => {
  const provider = anchor.AnchorProvider.local();
  anchor.setProvider(provider);
  const calculator = anchor.web3.Keypair.generate();
  const program = anchor.workspace.Mysolanacalculator; 
  //const program = (anchor as any).workspace.SolanaCalculator as Program<SolanaCalculator>;
  it('Create a calculator', async()=> {
    await program.rpc.create("Calculator inizialized",{
      accounts:{
        calculator: calculator.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId
      },
      signers: [calculator]
    });
      const account = await program.account.calculator.fetch(calculator.publicKey);
      assert.ok(account.greeting === "Calculator inizialized");
  });
});
