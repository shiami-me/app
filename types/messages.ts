export interface Source {
  url: string;
  content: string;
}

export interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  browserLogs?: Array<{ memory: string; goal: string; url: string }>;
}

export interface MessageHistory {
  [key: string]: {
    title: string;
    id: string;
  }
}

export type BrowserAction =
  | { go_to_url: { url: string } }
  | { input_text: { index: number; text: string } }
  | { click_element: { index: number } }
  | { extract_content: { include_links: boolean } }
  | { done: { text: string } };

export type BrowserState = {
  evaluation_previous_goal: string;
  memory: string;
  next_goal: string;
};

export type BrowserResult = {
  is_done: boolean;
  extracted_content?: string;
  include_in_memory?: boolean;
};

export type BrowserHistoryEntry = {
  model_output: {
    current_state: BrowserState;
    action: BrowserAction[];
  };
  result: BrowserResult[];
  state?: {
    tabs?: { page_id: number; url: string; title: string }[];
    interacted_element?: (string | null)[];
    url?: string;
    title?: string;
  };
};

export type BrowserResponse = {
  status: string;
  result: {
    status: string;
    result: {
      history: BrowserHistoryEntry[];
    };
  };
};

export type LoopResult = {
  loops: number;
  leverage: number;
  net_apr: number;
  total_deposit: number;
  total_borrowed: number;
  max_leverage: number;
  max_yield: number;
};

export type YieldTableEntry = {
  loops: number;
  leverage: string;
  net_apr: string;
  total_deposit: string;
  total_borrowed: string;
};

export type StrategyOverview = {
  deposit_token_logo: string;
  borrow_token_logo: string;
  deposit_apr: string;
  borrow_apr: string;
  collateral_programs: any[];
  debt_programs: any[];
  collateral_points: any[];
  debt_points: any[];
  spread: string;
  best_loops: number;
  max_leverage: string;
  max_yield: string;
  initial_investment: string;
  available_liquidity: string;
};

export type Strategy = {
  market_id: number;
  market: string;
  verified: boolean;
  deposit_token: string;
  borrow_token: string;
  strategy_overview: StrategyOverview;
  execution_steps: string[];
  yield_table: YieldTableEntry[];
  risk_considerations: string[];
};

export type LoopingStrategyOutput = {
  message: string;
  strategies_count: number;
  initial_amount: number;
  filtered_token: string | null;
  strategies: Strategy[];
  note: string;
};

export function isStrategyOutput(output: any): output is LoopingStrategyOutput {
  return "strategies_count" in output;
}
