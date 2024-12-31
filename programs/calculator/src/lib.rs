use anchor_lang::prelude::*;
use anchor_lang::solana_program::entrypoint::ProgramResult;

declare_id!("D3nwC8ho5mEDW51dpYsbWYJgN4kzt9kaUe63fknTyFH9");

#[program]
pub mod calculator {
    use super::*;
    pub fn create(ctx: Context<Create>, init_message: String) -> ProgramResult {
        let calculator = &mut ctx.accounts.calculator;
        calculator.greeting = init_message;
        Ok(())
    }
} 

#[derive(Accounts)]
pub struct Create<'info> {
    #[account(init, payer=user, space=264)]
    pub calculator: Account<'info, Calculator>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>
}

#[account]
pub struct Calculator {
    pub greeting: String,
    pub result: i64,
    pub remainder: i64
}