import { ConsoleLogger, Injectable, LogLevel } from '@nestjs/common';
import chalk from 'chalk';

@Injectable()
export class LoggerService extends ConsoleLogger {
  // Emojis par niveau
  private readonly emojis = {
    log: '🚀',
    error: '🔥',
    warn: '⚠️',
    debug: '🔍',
    verbose: '📣',
  };

  // Une couleur par niveau
  private readonly levelColors: Record<LogLevel, typeof chalk> = {
      log: chalk.greenBright,
      error: chalk.redBright,
      warn: chalk.yellowBright,
      debug: chalk.cyanBright,
      verbose: chalk.blueBright,
      fatal: chalk.magentaBright
  };

  private readonly logLevels: LogLevel[] = ['log', 'error', 'warn', 'debug', 'verbose'];

  log(message: any, context?: string) {
    if (this.isLevelEnabled('log')) {
      console.log(this.colorize('log', message, context));
    }
  }

  error(message: any, stack?: string, context?: string) {
    if (this.isLevelEnabled('error')) {
      console.error(this.colorize('error', message, context), stack ? `\n${stack}` : '');
    }
  }

  warn(message: any, context?: string) {
    if (this.isLevelEnabled('warn')) {
      console.warn(this.colorize('warn', message, context));
    }
  }

  debug(message: any, context?: string) {
    if (this.isLevelEnabled('debug')) {
      console.debug(this.colorize('debug', message, context));
    }
  }

  verbose(message: any, context?: string) {
    if (this.isLevelEnabled('verbose')) {
      console.info(this.colorize('verbose', message, context));
    }
  }

  /**
   * Retourne une chaîne de caractères avec :
   * - L'emoji correspondant au niveau
   * - Le label du niveau (coloré)
   * - L'heure (en jaune)
   * - Le contexte (en bleu si fourni)
   * - Le message final
   */
colorize(level: LogLevel, message: any, context?: string): string {
    // Emoji et couleur de niveau
    const emoji = this.emojis[level];
    const levelLabel = this.levelColors[level](`${emoji} [${level.toUpperCase()}]`);

    // Heure actuelle
    const now = new Date().toLocaleTimeString();
    const timeLabel = chalk.yellow(`[${now}]`);

    // Contexte (optionnel)
    const ctxLabel = context ? chalk.blue(`[${context}]`) : '';

    // Exemple de format :
    // 🚀 [LOG] => [TIME=12:34:56] | [CTX=AppService] => Mon message
    return [
      levelLabel,
      '=>',
      timeLabel,
      ctxLabel ? `| ${ctxLabel}` : '',
      '=>',
      message,
    ].join(' ');
  }
}
