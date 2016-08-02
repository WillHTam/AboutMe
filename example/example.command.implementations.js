angular.module('ng-terminal-example.command.implementations', ['ng-terminal-example.command.tools'])

.config(['commandBrokerProvider', function (commandBrokerProvider) {
    commandBrokerProvider.appendCommandHandler({
      command: 'who',
      description: ['Who IS William Tam?'],
      handle: function (session) {
        session.output.push({ output: true, text: ['You are reading about William Tam, a full stack developer who has a plethora of knowledge about getting your website to look and behave the way you want it to.'], breakline: true })
      }
    })

    commandBrokerProvider.appendCommandHandler({
      command: 'git',
      description: ["Get the link to William's GitHub account"],
      handle: function (session) {
        session.output.push({ output: true, text: ['http://www.github.com/willhtam'], breakline: true })
      }
    })

    commandBrokerProvider.appendCommandHandler({
      command: 'mail',
      description: ["Get William's email"],
      handle: function (session) {
        session.output.push({ output: true, text: ['william.tam18@gmail.com'], breakline: true })
      }
    })

    commandBrokerProvider.appendCommandHandler({
      command:'describe',
      description: ['Learn something about William'],
      handle: function (session) {
        session.output.push({ output: true, text: ['William is a full stack developer! Use the command "git" to see his GitHub account and look at his projects'], breakline: true})
      }
    })

    commandBrokerProvider.appendCommandHandler({
        command: 'version',
        description: ['Shows this software version.'],
        handle: function (session) {
            session.output.push({ output: true, text: ['Version 69.420 HIYOOOO'], breakLine: true });
        }
    });

    commandBrokerProvider.appendCommandHandler({
        command: 'clear',
        description: ['Clears the screen.'],
        handle: function (session) {
            session.commands.push({ command: 'clear' });
        }
    });

    commandBrokerProvider.appendCommandHandler({
        command: 'echo',
        description: ['Echoes input.'],
        handle: function (session) {
            var a = Array.prototype.slice.call(arguments, 1);
            session.output.push({ output: true, text: [a.join(' ')], breakLine: true });
        }
    });
    var suCommandHandler = function () {
        var me = {};
        var ga = null;
        me.command= 'su';
        me.description = ['Changes the  user identity.', "Syntax: su <userName>", "Example: su vtortola"];
        me.init = ['$ga', function ($ga) {
            ga = $ga;
        }];
        me.handle= function (session, login) {
            if (!login) {
                session.output.push({ output: true, text: ["The <userName> parameter is required.", "Type 'help su' to get a hint."], breakLine: true });
                return;
            }

            ga('set', { userId: login.toString() });
            session.login = login;
            session.commands.push({ command: 'change-prompt', prompt: { user: login }});
            session.output.push({ output: true, text: ["Identity changed."], breakLine: true });
        }
        return me;
    };
    commandBrokerProvider.appendCommandHandler(suCommandHandler());

    // this must be the last
    var helpCommandHandler = function () {
        var me = {};

        me.command = 'help';
        me.description = ['Provides instructions about how to use this terminal'];
        me.handle = function (session, cmd) {
            var list = commandBrokerProvider.describe();
            var outText = [];
            if (cmd) {
                for (var i = 0; i < list.length; i++) {
                    if (list[i].command == cmd) {
                        var l = list[i];
                        outText.push("Command help for: " + cmd);
                        for (var j = 0; j < l.description.length; j++) {
                            outText.push(l.description[j]);
                        }
                        break;
                    }
                }
                if(!outText.length)
                    outText.push("There is no command help for: " + cmd);
            }
            else {
                outText.push("Available commands:");
                for (var i = 0; i < list.length; i++) {
                    var str = "  " + list[i].command + "\t\t";
                    for (var j = 0; j < 3 && i + 1 < list.length; j++) {
                        var cmd = list[++i].command;
                        str += cmd + (cmd.length > 6 ? "\t" : "\t\t");
                    }
                    outText.push(str);
                }
                outText.push("");
                outText.push("Enter 'help <command>' to get help for a particular command.");
            }
            session.output.push({ output: true, text: outText, breakLine: true });
        };
        return me;
    };
    commandBrokerProvider.appendCommandHandler(helpCommandHandler());
}])

;
