use anchor_lang::prelude::*;

declare_id!("D3nwC8ho5mEDW51dpYsbWYJgN4kzt9kaUe63fknTyFH9");

#[program]
pub mod calculator {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
